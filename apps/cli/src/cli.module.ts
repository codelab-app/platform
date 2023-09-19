import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { BullModule } from '@nestjs/bull'
import type { OnApplicationShutdown } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { CommandModule } from './commands/command.module'

@Module({
  controllers: [],
  imports: [
    CommandModule,
    CodelabLoggerModule,
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
export class CliModule implements OnApplicationShutdown {
  onApplicationShutdown(signal: string) {
    console.log(`Received shutdown signal: ${signal}`)
    otelSDK
      .shutdown()
      .then(
        () => console.log('Opentelemetry shut down successfully'),
        (err) => console.log('Error shutting down SDK', err),
      )
      .finally(() => process.exit(0))
  }
}
