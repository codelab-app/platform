import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { OpenTelemetryModuleConfig } from '@codelab/backend/infra/adapter/otel'
import { BullModule } from '@nestjs/bull'
import { LoggerService, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { LoggerModule } from 'nestjs-pino'
import { CommandModule } from '../commands/command.module'

@Module({
  controllers: [],
  imports: [
    CommandModule,
    CodelabLoggerModule,
    OpenTelemetryModuleConfig,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // Need to import in module that uses the queue
    // BullModule.registerQueue({
    //   name: 'import-admin-data',
    // }),
  ],
  providers: [],
})
export class AppModule {}
