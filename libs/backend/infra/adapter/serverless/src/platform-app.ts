import { PlatformModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let platformApp: INestApplication | undefined

export const getPlatformListener = async () => {
  if (!platformApp) {
    platformApp = await NestFactory.create(PlatformModule, {
      // bodyParser: false,
    })
    // This must match the nextjs api path
    platformApp.setGlobalPrefix('api/graphql')
    await platformApp.init()
  }

  const server: Server = platformApp.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
