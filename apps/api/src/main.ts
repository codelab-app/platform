/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import { AppModule } from './app/app.module'
import { ROUTER_SERVICE } from '@codelab/api-router'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const { expressRouter } = app.get(ROUTER_SERVICE)

  const globalPrefix = ''

  app.setGlobalPrefix(globalPrefix)
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(expressRouter)

  const port = process.env.PORT || 3333

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`)
  })
}

bootstrap()
