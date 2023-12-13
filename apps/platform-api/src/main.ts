import { RootModule } from '@codelab/backend/infra/adapter/codelab'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule)
  const globalPrefix = 'api'
  const port = process.env.PORT || 4000

  app.setGlobalPrefix(globalPrefix)

  await app.listen(port)

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

void bootstrap()
