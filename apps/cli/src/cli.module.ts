import { CodelabLoggerModule } from '@codelab/backend-infra-adapter-logger'
import { Stage } from '@codelab/shared-abstract-core'
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

  const cliEnvFilePath = (file: string) =>
    path.resolve(process.cwd(), 'apps/cli', file)

  if (stage === Stage.Dev || stage === 'dev') {
    return envFilePath('.env')
  }

  if (stage === Stage.Test || stage === 'test') {
    return envFilePath('.env.test')
  }

  if (stage === Stage.CI || stage === 'ci') {
    return ''
  }

  // For prod stage, use CLI's .env file for packer/terraform commands
  if (stage === 'prod') {
    return cliEnvFilePath('.env')
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
