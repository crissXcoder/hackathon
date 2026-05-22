/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ZabbixService } from './zabbix.service';
import { MonitoringService } from './monitoring.service';
import { AiService } from '../ai/ai.service';

describe('MonitoringService', () => {
  let service: MonitoringService;
  let zabbixService: jest.Mocked<ZabbixService>;

  const mockZabbixService = {
    getHosts: jest.fn(),
    getItems: jest.fn(),
    getHistory: jest.fn(),
  };

  const mockAiService = {
    analyzeDeviceHealth: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoringService,
        { provide: ZabbixService, useValue: mockZabbixService },
        { provide: AiService, useValue: mockAiService },
      ],
    }).compile();

    service = module.get<MonitoringService>(MonitoringService);
    // Cast mock dependency cleanly
    zabbixService = module.get(ZabbixService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNetworkHealthStatus', () => {
    it('should return empty list if no hosts are returned by Zabbix', async () => {
      zabbixService.getHosts.mockResolvedValue([]);

      const result = await service.getNetworkHealthStatus();

      expect(result.items).toEqual([]);
      expect(result.total).toBe(0);
      expect(zabbixService.getHosts).toHaveBeenCalledTimes(1);
      expect(zabbixService.getItems).not.toHaveBeenCalled();
    });

    it('should return default N/A values if no items are found for the hosts', async () => {
      zabbixService.getHosts.mockResolvedValue([
        { hostid: '1', name: 'Switch Core', status: '0', ip: '10.10.2.10' },
      ]);
      zabbixService.getItems.mockResolvedValue([]);

      const result = await service.getNetworkHealthStatus();

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.items[0].name).toBe('Switch Core');
      expect(result.items[0].ip).toBe('10.10.2.10');
      expect(result.items[0].metrics).toEqual({
        temperature: null,
        cpuUsage: null,
        memoryUsage: null,
      });
      expect(result.items[0].lastCheck).toBeDefined();
      expect(zabbixService.getHosts).toHaveBeenCalledTimes(1);
      expect(zabbixService.getItems).toHaveBeenCalledWith('1');
      expect(zabbixService.getHistory).not.toHaveBeenCalled();
    });

    it('should successfully orchestrate calls and transform structure using Promise.all', async () => {
      zabbixService.getHosts.mockResolvedValue([
        { hostid: '1', name: 'Switch Core', status: '0', ip: '10.10.2.10' },
        { hostid: '2', name: 'Router Edge', status: '0', ip: '10.10.1.2' },
      ]);

      // Mock getItems responses
      zabbixService.getItems.mockImplementation((hostId: string) => {
        if (hostId === '1') {
          return Promise.resolve([
            { itemid: '101', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
            { itemid: '102', name: 'Temperature sensor', value_type: 0, key_: 'sensor.temp' },
            { itemid: '103', name: 'Memory usage', value_type: 3, key_: 'vm.memory.size' },
          ]);
        }
        if (hostId === '2') {
          return Promise.resolve([
            { itemid: '201', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
            { itemid: '203', name: 'Memory usage percentage', value_type: 3, key_: 'vm.memory.pused' },
          ]);
        }
        return Promise.resolve([]);
      });

      // Mock getHistory responses
      zabbixService.getHistory.mockImplementation((itemId: string) => {
        if (itemId === '101') {
          return Promise.resolve([
            { itemid: '101', clock: 1716300000, value: '12' },
          ]);
        }
        if (itemId === '102') {
          return Promise.resolve([
            { itemid: '102', clock: 1716300010, value: '45' },
          ]);
        }
        if (itemId === '103') {
          return Promise.resolve([
            { itemid: '103', clock: 1716299990, value: '60' },
          ]);
        }
        if (itemId === '201') {
          return Promise.resolve([
            { itemid: '201', clock: 1716300020, value: '25' },
          ]);
        }
        if (itemId === '203') {
          return Promise.resolve([
            { itemid: '203', clock: 1716300015, value: '40' },
          ]);
        }
        return Promise.resolve([]);
      });

      const result = await service.getNetworkHealthStatus();

      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);

      // Verify device 1
      expect(result.items[0]).toEqual({
        id: '1',
        name: 'Switch Core',
        ip: '10.10.2.10',
        status: 'up',
        metrics: {
          temperature: '45',
          cpuUsage: '12',
          memoryUsage: '60',
        },
        lastCheck: new Date(1716300010 * 1000).toISOString(), // Max clock is 1716300010
      });

      // Verify device 2
      expect(result.items[1]).toEqual({
        id: '2',
        name: 'Router Edge',
        ip: '10.10.1.2',
        status: 'up',
        metrics: {
          temperature: null, // Missing temperature item
          cpuUsage: '25',
          memoryUsage: '40.0%',
        },
        lastCheck: new Date(1716300020 * 1000).toISOString(), // Max clock is 1716300020
      });

      expect(zabbixService.getHosts).toHaveBeenCalledTimes(1);
      expect(zabbixService.getItems).toHaveBeenCalledTimes(2);
      expect(zabbixService.getHistory).toHaveBeenCalledTimes(5);
    });

    it('should degrade gracefully if one host items call fails, but others succeed', async () => {
      zabbixService.getHosts.mockResolvedValue([
        { hostid: '1', name: 'Switch Core', status: '0', ip: '10.10.2.10' },
        { hostid: '2', name: 'Failed Host', status: '0', ip: '10.10.2.11' },
      ]);

      zabbixService.getItems.mockImplementation((hostId: string) => {
        if (hostId === '1') {
          return Promise.resolve([
            { itemid: '101', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
          ]);
        }
        return Promise.reject(new Error('Network Timeout'));
      });

      zabbixService.getHistory.mockImplementation((itemId: string) => {
        if (itemId === '101') {
          return Promise.resolve([
            { itemid: '101', clock: 1716300000, value: '15' },
          ]);
        }
        return Promise.resolve([]);
      });

      const result = await service.getNetworkHealthStatus();

      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);

      // Device 1
      expect(result.items[0].name).toBe('Switch Core');
      expect(result.items[0].metrics.cpuUsage).toBe('15');

      // Device 2
      expect(result.items[1].name).toBe('Failed Host');
      expect(result.items[1].metrics).toEqual({
        temperature: null,
        cpuUsage: null,
        memoryUsage: null,
      });
    });

    it('should degrade gracefully if one history query fails, but others succeed', async () => {
      zabbixService.getHosts.mockResolvedValue([
        { hostid: '1', name: 'Switch Core', status: '0', ip: '10.10.2.10' },
      ]);

      zabbixService.getItems.mockResolvedValue([
        { itemid: '101', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
        { itemid: '102', name: 'Memory usage', value_type: 3, key_: 'vm.memory.size' },
      ]);

      zabbixService.getHistory.mockImplementation((itemId: string) => {
        if (itemId === '101') {
          return Promise.reject(new Error('Zabbix Server Busy'));
        }
        if (itemId === '102') {
          return Promise.resolve([
            { itemid: '102', clock: 1716300000, value: '35' },
          ]);
        }
        return Promise.resolve([]);
      });

      const result = await service.getNetworkHealthStatus();

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.items[0].name).toBe('Switch Core');
      expect(result.items[0].metrics).toEqual({
        temperature: null,
        cpuUsage: null, // Failed query
        memoryUsage: '35', // Succeeded query
      });
      expect(result.items[0].lastCheck).toBe(
        new Date(1716300000 * 1000).toISOString(),
      );
    });

    it('should paginate hosts first and only fetch metrics for the paginated subset', async () => {
      const mockHosts = Array.from({ length: 12 }).map((_, i) => ({
        hostid: `${i + 1}`,
        name: `Host ${i + 1}`,
        status: '0',
        ip: `10.0.0.${i + 1}`,
      }));
      zabbixService.getHosts.mockResolvedValue(mockHosts);
      zabbixService.getItems.mockResolvedValue([]);

      const result = await service.getNetworkHealthStatus(2, 5);

      expect(result.items).toHaveLength(5);
      expect(result.total).toBe(12);
      expect(result.items[0].name).toBe('Host 6');
      expect(result.items[4].name).toBe('Host 10');

      expect(zabbixService.getHosts).toHaveBeenCalledTimes(1);
      expect(zabbixService.getItems).toHaveBeenCalledTimes(5);
      expect(zabbixService.getItems).toHaveBeenCalledWith('6');
      expect(zabbixService.getItems).toHaveBeenCalledWith('10');
      expect(zabbixService.getItems).not.toHaveBeenCalledWith('1');
    });

    it('should cache host items and reuse them in subsequent calls', async () => {
      zabbixService.getHosts.mockResolvedValue([
        { hostid: '99', name: 'Cached Host', status: '0', ip: '10.0.0.99' },
      ]);
      zabbixService.getItems.mockResolvedValue([
        { itemid: '999', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
      ]);
      zabbixService.getHistory.mockResolvedValue([
        { itemid: '999', clock: 1716300000, value: '55' },
      ]);

      const res1 = await service.getNetworkHealthStatus(1, 10);
      expect(res1.items[0].metrics.cpuUsage).toBe('55');

      const res2 = await service.getNetworkHealthStatus(1, 10);
      expect(res2.items[0].metrics.cpuUsage).toBe('55');

      expect(zabbixService.getHosts).toHaveBeenCalledTimes(2);
      expect(zabbixService.getItems).toHaveBeenCalledTimes(1);
      expect(zabbixService.getHistory).toHaveBeenCalledTimes(2);
    });
  });
});
