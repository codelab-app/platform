/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CodelabAppModule } from './app/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(CodelabAppModule)
  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3333

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
