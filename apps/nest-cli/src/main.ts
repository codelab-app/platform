import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CommandFactory } from 'nest-commander'
import { AppModule } from './app/app.module'
import { CodelabLogger } from './logger/logger.service'

const bootstrap = async () => {
  await CommandFactory.run(AppModule, new CodelabLogger())
}

void bootstrap()
