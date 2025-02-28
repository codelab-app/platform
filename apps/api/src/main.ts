import type { endpointConfig } from '@codelab/backend/infra/core'
import type { INestApplication } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import type * as http from 'http'

import { GraphqlService } from '@codelab/backend/infra/adapter/graphql'
import {
  loggerConfig,
  PinoLoggerService,
} from '@codelab/backend/infra/adapter/logger'
import { ENDPOINT_CONFIG_KEY } from '@codelab/backend/infra/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { configureNestJsTypebox } from 'nestjs-typebox'

import { AllExceptionsFilter } from './exceptions/all-exceptions.filter'
// Instrument add this first
// Need to make sure "module": "CommonJS", "ESNext" is processed in two phases
import './instrument'
import { RootModule } from './root.module'

configureNestJsTypebox({
  // provide swagger OpenAPI generator support
  patchSwagger: true,
  // provide custom JSON schema string format support
  // currently only "email".
  setFormats: true,
})

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(RootModule, {
    cors: {
      allowedHeaders: ['*'],
      credentials: true,
    },
  })

  app.enableShutdownHooks()

  /**
   * Add global prefix
   */

  const configService = app.get(ConfigService)
  /**
   * Log the current API_LOG_LEVEL
   */
  const logger = app.get(PinoLoggerService)

  logger.log(`Current API_LOG_LEVEL: ${loggerConfig().level}`)

  const config: ConfigType<typeof endpointConfig> =
    configService.getOrThrow(ENDPOINT_CONFIG_KEY)

  const baseApiPath = config.baseApiPath

  app.setGlobalPrefix(baseApiPath)

  /**
   * Add exceptions filter
   */
  const { httpAdapter } = app.get(HttpAdapterHost)
  const httpServer = httpAdapter.getHttpServer()

  httpServer.keepAliveTimeout = 60000
  httpServer.headersTimeout = 60000

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  /**
   * Add swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Codelab API')
    .setDescription('The Codelab API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(baseApiPath, app, document)

  /**
   * Set port number from config
   */

  const port = config.apiPort

  const server = await app.listen(port).then((_server) => {
    const graphqlService = app.get(GraphqlService)

    graphqlService.serverReadyHook()

    return _server
  })

  server.keepAliveTimeout = 60000

  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}${baseApiPath}`,
  )
}

void bootstrap()

process.on('uncaughtException', (error) => {
  console.error('🔴 UNCAUGHT EXCEPTION:', error)
})

process.on('unhandledRejection', (reason) => {
  console.error('🔴 UNHANDLED REJECTION:', reason)
})
