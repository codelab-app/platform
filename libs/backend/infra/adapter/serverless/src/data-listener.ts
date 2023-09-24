import { DataServerlessModule } from '@codelab/backend/infra/adapter/codelab'
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let app: INestApplication | undefined

export const getDataListener = async () => {
  if (!app) {
    await otelSDK.start()

    app = await NestFactory.create(DataServerlessModule, {
      // https://docs.nestjs.com/devtools/overview
      snapshot: true,
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
