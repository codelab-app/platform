import { CypressServerlessModule } from '@codelab/backend/infra/adapter/codelab'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import type { Server } from 'http'
import type { NextApiHandler } from 'next'

let app: INestApplication | undefined

export const getCypressListener = async () => {
  if (!app) {
    app = await NestFactory.create(CypressServerlessModule, {
      // body Parser: false,
    })
    // This must match the nextjs api path
    app.setGlobalPrefix('api/cypress')

    const config = new DocumentBuilder().setTitle('Cypress API').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/cypress', app, document)

    await app.init()
  }

  const server: Server = app.getHttpServer()
  const [listener] = server.listeners('request') as Array<NextApiHandler>

  if (!listener) {
    throw new Error('Missing NextApiHandler')
  }

  return listener
}
