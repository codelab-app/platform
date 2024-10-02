import type { endpointConfig } from '@codelab/backend/infra/core'
import type { ConfigType } from '@nestjs/config'

import { GraphqlService } from '@codelab/backend/infra/adapter/graphql'
import { ENDPOINT_CONFIG_KEY } from '@codelab/backend/infra/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { applyFormats, patchNestJsSwagger } from 'nestjs-typebox'

import { AllExceptionsFilter } from './exceptions/all-exceptions.filter'
import { RootModule } from './root.module'

// provide swagger OpenAPI generator support
patchNestJsSwagger()

// provide custom JSON schema string format support
// currently only "email".
applyFormats()

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule, {
    /**
     * Enables devtools https://docs.nestjs.com/devtools/overview
     */
    snapshot: true,
    // logger: false,
  })

  app.enableShutdownHooks()

  /**
   * Add global prefix
   */

  const configService = app.get(ConfigService)

  const config: ConfigType<typeof endpointConfig> =
    configService.getOrThrow(ENDPOINT_CONFIG_KEY)

  const baseApiPath = config.baseApiPath

  app.setGlobalPrefix(baseApiPath)

  /**
   * Add exceptions filter
   */
  const { httpAdapter } = app.get(HttpAdapterHost)

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

  await app.listen(port).then(() => {
    const graphqlService = app.get(GraphqlService)

    graphqlService.emitServerReady()
  })
  Logger.log(
    `🚀 Application is running on: http://127.0.0.1:${port}${baseApiPath}`,
  )
}

void bootstrap()
