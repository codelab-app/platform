import { DataModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let cliApp: INestApplication | undefined

export const getDataListener = async () => {
  if (!cliApp) {
    cliApp = await NestFactory.create(DataModule, {
      // body Parser: false,
    })
    // This must match the nextjs api path
    cliApp.setGlobalPrefix('api/data')
    await cliApp.init()
  }

  const server: Server = cliApp.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
