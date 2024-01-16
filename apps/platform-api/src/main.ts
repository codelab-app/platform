import type { endpointConfig } from '@codelab/backend/infra/adapter/codelab'
import { ENDPOINT_CONFIG_KEY } from '@codelab/backend/infra/adapter/codelab'
import { Logger } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RootModule } from './root.module'

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule)
  const globalPrefix = 'api'
  const configService = app.get(ConfigService)

  const config: ConfigType<typeof endpointConfig> =
    configService.getOrThrow(ENDPOINT_CONFIG_KEY)

  const port = config.graphqlApiPort

  app.setGlobalPrefix(globalPrefix)

  await app.listen(port)

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

void bootstrap()
