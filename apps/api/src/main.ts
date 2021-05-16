/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.enableCors({ origin: '*' }) //TODO remove this, add more fine-grained control

  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log(`Listening at http://127.0.0.1:${port}/${globalPrefix}`)
  })
}

bootstrap()
