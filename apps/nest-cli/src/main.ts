import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CommandFactory } from 'nest-commander'
import { AppModule } from './app/app.module'
import { CodelabLogger } from './logger/logger.service'
import { otelSDK } from './tracing'

const bootstrap = async () => {
  await otelSDK.start()
  await CommandFactory.run(AppModule, new CodelabLogger())
}

void bootstrap()
