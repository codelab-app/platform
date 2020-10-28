/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import * as shell from 'shelljs'
import { AppModule } from './app/app.module'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'
import { ROUTER_SERVICE } from '@codelab/api/providers/router'

const watchGraph = () => {
  /**
   * GraphQL files is automatically watched inside assets folder
   */
  shell.exec(
    'wait-on http://localhost:4000 && graphql-codegen --config codegen.yml',
  )
  // if (shell.exec('make generate-graphql').code !== 0) {
  //   shell.echo('Generating GraphQL files failed')
  //   shell.exit(1)
  // }
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const { expressRouter } = app.get(ROUTER_SERVICE)
  const config: ConfigService<ApiConfig> = app.get(ConfigService)

  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(expressRouter)

  const port = config.get(ApiConfigTypes.PORT_GATEWAY)

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
