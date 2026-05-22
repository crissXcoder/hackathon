import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ZabbixService } from './zabbix.service';
import { ZabbixController } from './zabbix.controller';
import { MonitoringService } from './monitoring.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
    AiModule,
  ],
  controllers: [ZabbixController],
  providers: [ZabbixService, MonitoringService],
  exports: [ZabbixService, MonitoringService],
})
export class ZabbixModule {}
