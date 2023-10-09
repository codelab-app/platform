import { PlatformServerlessModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let app: INestApplication | undefined

export const getPlatformListener = async () => {
  if (!app) {
    app = await NestFactory.create(PlatformServerlessModule, {
      // bodyParser: false,
    })
    // This must match the nextjs api path
    app.setGlobalPrefix('api/graphql')
    // app.enableShutdownHooks()

    await app.init()
  }

  const server: Server = app.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
