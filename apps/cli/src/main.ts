import { NestFactory } from '@nestjs/core'

import { CliModule } from './cli.module'

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(CliModule, {
    // logger: process.env.DEBUG ? ['error', 'warn'] : false,
    logger: ['error'],
  })

  await app.init()
}

void bootstrap()
