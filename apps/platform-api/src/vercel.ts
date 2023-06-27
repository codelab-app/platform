import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'
import { AppModule } from './app/app.module'

let app: INestApplication | undefined

export const getListener = async () => {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      bodyParser: false,
    })
    app.setGlobalPrefix('api')
    await app.init()
  }

  const server: Server = app.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
