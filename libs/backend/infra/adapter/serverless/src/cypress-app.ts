import { CypressModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let cypressApp: INestApplication | undefined

export const getCypressListener = async () => {
  if (!cypressApp) {
    cypressApp = await NestFactory.create(CypressModule, {
      // body Parser: false,
    })
    // This must match the nextjs api path
    cypressApp.setGlobalPrefix('api/cypress')
    await cypressApp.init()
  }

  const server: Server = cypressApp.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
