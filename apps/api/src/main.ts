/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.enableCors({ origin: '*' })

  //Allows us to use class-validator to validate graphql input
  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log(`Listening at http://127.0.0.1:${port}/${globalPrefix}`)
  })
}

bootstrap()
