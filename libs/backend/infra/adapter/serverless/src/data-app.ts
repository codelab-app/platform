import { DataModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type { IncomingMessage, Server, ServerResponse } from 'http'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

let app: INestApplication | undefined

export const getDataListener = async () => {
  if (!app) {
    app = await NestFactory.create(DataModule, {
      // body Parser: false,
    })
    // This must match the nextjs api path
    app.setGlobalPrefix('api/data')

    const config = new DocumentBuilder().setTitle('Data API').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/data', app, document)

    await app.init()
  }

  const server: Server = app.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
