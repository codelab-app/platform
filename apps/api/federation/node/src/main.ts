import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const config: ConfigService<ApiConfig> = app.get(ConfigService)
  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  const port = config.get(ApiConfigTypes.FEDERATION_GRAPH_PORT)

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
