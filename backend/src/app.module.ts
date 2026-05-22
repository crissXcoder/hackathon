import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZabbixModule } from './zabbix/zabbix.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';

console.log("EVALUATING APP MODULE...");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ZabbixModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
