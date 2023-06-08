import { LoggerService, Module } from '@nestjs/common'
import { LoggerModule } from '../logger'
import { OpenTelemetryModuleConfig } from '../otel/otel.module'
import { BasicCommand } from '../task.command'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [LoggerModule, OpenTelemetryModuleConfig],
  providers: [AppService, BasicCommand],
})
export class AppModule {}
