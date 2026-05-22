import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Sse,
  MessageEvent,
  DefaultValuePipe,
} from '@nestjs/common';
import { interval, Observable, map, switchMap } from 'rxjs';
import { ZabbixService } from './zabbix.service';
import { MonitoringService } from './monitoring.service';
import { AiService } from '../ai/ai.service';

interface TokenResponse {
  token: string | null;
}

interface ZabbixHost {
  hostid: string;
  name: string;
  status: string;
}

interface ZabbixItem {
  itemid: string;
  name: string;
  value_type: number;
}

interface ZabbixHistory {
  itemid: string;
  clock: number;
  value: string;
}

@Controller('zabbix')
export class ZabbixController {
  constructor(
    private readonly zabbixService: ZabbixService,
    private readonly monitoringService: MonitoringService,
    private readonly aiService: AiService,
  ) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async authenticate(): Promise<TokenResponse> {
    const token = await this.zabbixService.authenticate();
    return { token };
  }

  @Get('token')
  getCachedToken(): TokenResponse {
    const token = this.zabbixService.getCachedToken();
    return { token };
  }

  @Delete('cache')
  @HttpCode(HttpStatus.NO_CONTENT)
  clearCache(): void {
    this.zabbixService.clearCache();
  }

  @Get('hosts')
  async getHosts(): Promise<any> {
    return this.zabbixService.getHosts();
  }

  @Get('hosts/:hostId/items')
  async getItems(@Param('hostId') hostId: string): Promise<ZabbixItem[]> {
    return this.zabbixService.getItems(hostId);
  }

  @Get('items/:itemId/history')
  async getHistory(
    @Param('itemId') itemId: string,
    @Query('valueType', ParseIntPipe) valueType: number,
  ): Promise<ZabbixHistory[]> {
    return this.zabbixService.getHistory(itemId, valueType);
  }

  @Get('device/:id')
  getDeviceDetail(@Param('id') id: string) {
    return this.monitoringService.getSimulatedDeviceDetail(id);
  }

  @Post('device/:id/diagnose')
  async diagnoseDevice(@Param('id') id: string) {
    const history = await this.monitoringService.getSimulatedDeviceDetail(id);
    return this.aiService.diagnoseSpikes(history);
  }

  @Get('health')
  async getNetworkHealthStatus(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.monitoringService.getNetworkHealthStatus(page, limit);
  }

  @Sse('stream')
  streamNetworkHealth(): Observable<MessageEvent> {
    return interval(10000).pipe(
      switchMap(async () => {
        const { items } = await this.monitoringService.getNetworkHealthStatus(1, 1000);
        return { data: { metrics: items } };
      }),
      map((payload) => ({ data: payload } as MessageEvent)),
    );
  }
}
