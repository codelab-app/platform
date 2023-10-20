// eslint-disable-next-line simple-import-sort/imports
// import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { NestFactory } from '@nestjs/core'
import { CliModule } from './cli.module'

const bootstrap = async () => {
  // otelSDK.start()

  const app = await NestFactory.createApplicationContext(CliModule, {})

  await app.init()
}

void bootstrap()
