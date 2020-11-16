/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'
import { AppModule } from './app/app.module'
import { GraphErrorHandler } from './app/filters/graph-error-handler'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'
import { isDev } from '@codelab/shared/utils'

import 'reflect-metadata'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  // const { expressRouter } = app.get(ROUTER_SERVICE)
  const config: ConfigService<ApiConfig> = app.get(ConfigService)

  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.useGlobalFilters(new GraphErrorHandler())
  app.use(bodyParser.json())
  // app.use(methodOverride())
  // app.use(expressRouter)

  const port = config.get(ApiConfigTypes.API_PORT_GRAPH)

  await app.listen(port, () => {
    // Reload Hasura metadata
    if (isDev) {
      shell.exec('make hasura-metadata-reload')
    }

    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
