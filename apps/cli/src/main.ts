// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const bootstrap = async () => {
  await otelSDK.start()

  const app = await NestFactory.createApplicationContext(AppModule, {
    // logger: false,
  })

  await app.init()
  // await app.close()
}

void bootstrap()
