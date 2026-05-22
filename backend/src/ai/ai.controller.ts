import { Controller, Post, Param } from '@nestjs/common';
import { AiService } from './ai.service';
import { MonitoringService } from '../zabbix/monitoring.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly monitoringService: MonitoringService,
  ) {}

  @Post('diagnose/:id')
  async diagnoseDevice(@Param('id') id: string) {
    const history = await this.monitoringService.getSimulatedDeviceDetail(id);
    return this.aiService.diagnoseSpikes(history);
  }
}
