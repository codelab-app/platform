import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { Stage } from '@codelab/shared/abstract/core'
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
    path.resolve(process.cwd(), 'apps/api', file)

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
export class CliModule {}
