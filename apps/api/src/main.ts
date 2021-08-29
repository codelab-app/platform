/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { get } from 'env-var'
import { CodelabAppModule } from './app/codelab-app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(CodelabAppModule, {
    logger: ['log', 'error'],
  })

  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.enableCors({ origin: '*' })

  // Allows us to use class-validator to validate graphql input
  app.useGlobalPipes(new ValidationPipe())

  // Starts listening for shutdown hooks
  if (process.env.NODE_ENV !== 'production') {
    app.enableShutdownHooks()
  }

  const apiEndpoint = get('CODELAB_API_ENDPOINT').required().asUrlObject()
  const port = get('CODELAB_API_PORT').asPortNumber() ?? apiEndpoint.port

  await app.listen(port, () => {
    Logger.log(`Listening at ${apiEndpoint.toJSON()}${globalPrefix}`)
  })
}

bootstrap()
