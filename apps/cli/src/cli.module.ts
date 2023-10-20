import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { Stage } from '@codelab/shared/abstract/core'
import type { OnApplicationShutdown } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import path from 'path'
import { CommandModule } from './commands/command.module'

const getEnvFilePath = () => {
  const stageFlagIndex = process.argv.findIndex((arg) => arg === '--stage')
  const stage = process.argv[stageFlagIndex + 1]

  if (!stage) {
    throw new Error('Missing or incorrect --stage flag')
  }

  const envFilePath = (file: string) =>
    path.resolve(process.cwd(), 'apps/cli', file)

  if (stage === Stage.Dev) {
    return envFilePath('.env')
  }

  if (stage === Stage.Test) {
    return envFilePath('.env.test')
  }

  if (stage === Stage.CI) {
    return ''
  }
}

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
    CommandModule,
    CodelabLoggerModule,
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
