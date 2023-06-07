/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import serverlessExpress from '@vendia/serverless-express'
import type { Callback, Context, Handler } from 'aws-lambda'
import { AppModule } from './app/app.module'

let server: Handler | undefined

/**
 * Used for when nx configuration is `production`
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  await app.init()

  const expressApp = app.getHttpAdapter().getInstance()

  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (
  event: unknown,
  context: Context,
  callback: Callback,
) => {
  server ??= await bootstrap()

  return server(event, context, callback)
}
