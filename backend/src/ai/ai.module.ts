import { Module, forwardRef } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ZabbixModule } from '../zabbix/zabbix.module';

@Module({
  imports: [forwardRef(() => ZabbixModule)],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
