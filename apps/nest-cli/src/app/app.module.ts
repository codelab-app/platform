import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { OpenTelemetryModuleConfig } from '@codelab/backend/infra/adapter/otel'
import { LoggerService, Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { CommandModule } from '../commands/command.module'
import { BasicCommand } from '../task.command'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [CodelabLoggerModule, OpenTelemetryModuleConfig],
  providers: [CommandModule, AppService, BasicCommand],
})
export class AppModule {}
