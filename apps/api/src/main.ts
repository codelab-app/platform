import { Logger } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { applyFormats, patchNestJsSwagger } from 'nestjs-typebox'
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter'
import type { endpointConfig } from './graphql/endpoint.config'
import { ENDPOINT_CONFIG_KEY } from './graphql/endpoint.config'
import { RootModule } from './root.module'

// provide swagger OpenAPI generator support
patchNestJsSwagger()

// provide custom JSON schema string format support
// currently only "email".
applyFormats()

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule, {
    // logger: false,
  })

  /**
   * Add global prefix
   */
  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

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

  SwaggerModule.setup('api', app, document)

  /**
   * Set port number from config
   */
  const configService = app.get(ConfigService)

  const config: ConfigType<typeof endpointConfig> =
    configService.getOrThrow(ENDPOINT_CONFIG_KEY)

  const port = config.graphqlApiPort

  await app.listen(port)

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

void bootstrap()
