// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { CommandModule } from './commands/command.module'
import { CommandService } from './commands/command.service'

const bootstrap = async () => {
  await otelSDK.start()

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  })

  await app.init()

  await app.select(CommandModule).get(CommandService)
  await app.close()
}

void bootstrap()
