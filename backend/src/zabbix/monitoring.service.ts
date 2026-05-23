import { Injectable, Logger } from '@nestjs/common';
import { ZabbixService } from './zabbix.service';
import { AiService } from '../ai/ai.service';

export type DeviceStatus = 'up' | 'down' | 'unknown';

export interface NetworkDevice {
  id: string;
  name: string;
  status: DeviceStatus;
  ip: string;
  lastCheck: string;
  availability?: number;
  metrics: {
    temperature: string | null;
    cpuUsage: string | null;
    memoryUsage: string | null;
  };
}

export interface DeviceMetricHistory {
  cpu: number;
  ram: number;
  temp: number;
  timestamp: string;
}

export interface DeviceHistory {
  id: string;
  spikeCount: number;
  history: DeviceMetricHistory[];
  status: 'HEALTHY' | 'CRITICAL';
}

interface MetricQuery {
  hostIndex: number;
  metricKey: 'temperature' | 'cpuUsage' | 'memoryUsage';
  itemId: string;
  valueType: number;
  itemName: string;
  itemKey: string;
}

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);
  private readonly deviceHistoryMap = new Map<string, DeviceHistory>();
  private readonly hostItemsCache = new Map<
    string,
    Array<{ itemid: string; name: string; value_type: number; key_: string }>
  >();

  constructor(
    private readonly zabbixService: ZabbixService,
  ) {}

  async getSimulatedDeviceDetail(hostId: string): Promise<any> {
    let hosts: any[] = [];
    try {
      hosts = await this.zabbixService.getHosts();
    } catch (e) {
      hosts = [];
    }
    const host = hosts.find((h: any) => h.hostid === hostId) || { name: 'Dispositivo Desconocido', ip: 'IP no disponible' };

    let record = this.deviceHistoryMap.get(hostId);
    if (!record) {
      record = { id: hostId, spikeCount: 0, history: [], status: 'HEALTHY' };
      this.deviceHistoryMap.set(hostId, record);
    }

    const cpu = Math.floor(Math.random() * 100);
    const ram = Math.floor(Math.random() * 100);
    const temp = Math.floor(Math.random() * 100);

    const isSpike = cpu > 90 || temp > 80 || ram > 95;
    if (isSpike) {
      record.spikeCount += 1;
    }

    if (record.spikeCount > 10) {
      record.status = 'CRITICAL';
    }

    record.history.push({ cpu, ram, temp, timestamp: new Date().toISOString() });
    
    if (record.history.length > 50) {
      record.history.shift();
    }

    const latest = record.history[record.history.length - 1];

    return {
      id: hostId,
      name: host.name,
      ip: host.ip,
      status: record.status.toLowerCase(),
      temperature: latest.temp,
      cpu: latest.cpu,
      memory: latest.ram,
      peaksCount: record.spikeCount,
      peaks: record.history.map(h => ({
        timestamp: h.timestamp,
        value: Math.max(h.cpu, h.temp, h.ram),
        cpu: h.cpu,
        ram: h.ram,
        temp: h.temp,
      })),
    };
  }

  async getNetworkHealthStatus(
    page = 1,
    limit = 10,
  ): Promise<{ items: NetworkDevice[]; total: number }> {
    this.logger.log(`Fetching paginated network health status (page: ${page}, limit: ${limit})`);
    const allHosts = await this.zabbixService.getHosts();
    const total = allHosts.length;
    const paginatedHosts = allHosts.slice((page - 1) * limit, page * limit);

    const items = await this._getNetworkHealthWithMetrics(paginatedHosts);
    return { items, total };
  }

  private async _getNetworkHealthWithMetrics(
    targetHosts?: Array<{ hostid: string; name: string; status: string; ip: string }>,
  ): Promise<NetworkDevice[]> {
    const hosts = targetHosts || await this.zabbixService.getHosts();
    if (hosts.length === 0) {
      return [];
    }

    const hostsWithItems = await Promise.all(
      hosts.map(async (host) => {
        try {
          let items = this.hostItemsCache.get(host.hostid);
          if (!items) {
            items = await this.zabbixService.getItems(host.hostid);
            this.hostItemsCache.set(host.hostid, items);
          }
          return { host, items };
        } catch (error: unknown) {
          this.logger.error(
            `Failed to fetch items for host ${host.name} (${host.hostid}): ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
          return { host, items: [] };
        }
      }),
    );

    const deviceStatuses: Omit<NetworkDevice, 'lastCheck'>[] = hostsWithItems.map(({ host }) => ({
      id: host.hostid,
      name: host.name,
      ip: host.ip,
      status: this.mapZabbixStatus(host.status),
      metrics: {
        temperature: null,
        cpuUsage: null,
        memoryUsage: null,
      },
    }));

    const queries: MetricQuery[] = [];
    
    const findCpuItem = (items: Array<{ itemid: string; name: string; key_: string; value_type: number }>) => {
      const usageRegex = /(cpu|processor).*(utilization|usage|percent|%)/i;
      const match = items.find((item) => usageRegex.test(item.name) || usageRegex.test(item.key_));
      if (match) return match;
      const genericRegex = /cpu|processor/i;
      return items.find((item) => genericRegex.test(item.name) || genericRegex.test(item.key_));
    };

    const findMemoryItem = (items: Array<{ itemid: string; name: string; key_: string; value_type: number }>) => {
      const usageRegex = /(memory|ram).*(utilization|usage|percent|%|used|used_percent)/i;
      const match = items.find((item) => usageRegex.test(item.name) || usageRegex.test(item.key_));
      if (match) return match;
      const genericRegex = /memory|ram/i;
      return items.find((item) => genericRegex.test(item.name) || genericRegex.test(item.key_));
    };

    const findTemperatureItem = (items: Array<{ itemid: string; name: string; key_: string; value_type: number }>) => {
      const tempRegex = /temp|thermal/i;
      return items.find((item) => tempRegex.test(item.name) || tempRegex.test(item.key_));
    };

    hostsWithItems.forEach(({ items }, index) => {
      const tempItem = findTemperatureItem(items);
      const cpuItem = findCpuItem(items);
      const memItem = findMemoryItem(items);

      if (tempItem) {
        queries.push({
          hostIndex: index,
          metricKey: 'temperature',
          itemId: tempItem.itemid,
          valueType: tempItem.value_type,
          itemName: tempItem.name,
          itemKey: tempItem.key_,
        });
      }
      if (cpuItem) {
        queries.push({
          hostIndex: index,
          metricKey: 'cpuUsage',
          itemId: cpuItem.itemid,
          valueType: cpuItem.value_type,
          itemName: cpuItem.name,
          itemKey: cpuItem.key_,
        });
      }
      if (memItem) {
        queries.push({
          hostIndex: index,
          metricKey: 'memoryUsage',
          itemId: memItem.itemid,
          valueType: memItem.value_type,
          itemName: memItem.name,
          itemKey: memItem.key_,
        });
      }
    });

    const historyResults = await Promise.all(
      queries.map(async (q) => {
        try {
          return await this.zabbixService.getHistory(q.itemId, q.valueType);
        } catch (error) {
          return [];
        }
      }),
    );
    
    const clocks: { [key: number]: number[] } = {};
    queries.forEach((q, idx) => {
      const history = historyResults[idx];
      if (history && history.length > 0) {
        const latest = history[0];
        let val = latest.value;
        if (q.metricKey === 'memoryUsage') {
          val = this.formatMemoryValue(val, q.itemName, q.itemKey);
        }
        deviceStatuses[q.hostIndex].metrics[q.metricKey] = val;
        if (!clocks[q.hostIndex]) clocks[q.hostIndex] = [];
        clocks[q.hostIndex].push(latest.clock);
      }
    });

    return deviceStatuses.map((device, index) => {
      const deviceClocks = clocks[index] || [];
      const lastCheck = deviceClocks.length > 0
          ? new Date(Math.max(...deviceClocks) * 1000).toISOString()
          : new Date().toISOString();
      return { ...device, lastCheck };
    });
  }

  private formatMemoryValue(value: string, itemName: string, itemKey: string): string {
    const num = Number(value);
    if (isNaN(num)) {
      return value;
    }

    const isPercent = /(percent|pavailable|pused|%)/i.test(itemName) || /(percent|pavailable|pused|%)/i.test(itemKey);
    if (isPercent) {
      return `${num.toFixed(1)}%`;
    }

    const isBytes = num > 1000000 || /(bytes|size|free|used|available|ram)/i.test(itemName) || /(bytes|size|free|used|available|ram)/i.test(itemKey);
    if (isBytes && num > 1000) {
      const gb = num / (1024 * 1024 * 1024);
      if (gb >= 0.01) {
        return `${gb.toFixed(2)} GB`;
      }
      const mb = num / (1024 * 1024);
      return `${mb.toFixed(1)} MB`;
    }

    return value;
  }

  private mapZabbixStatus(status: string): DeviceStatus {
    switch (status) {
      case '0': return 'up';
      case '1': return 'down';
      default: return 'unknown';
    }
  }
}
