// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
import { NestFactory } from '@nestjs/core'
import { CliModule } from './cli.module'

const bootstrap = async () => {
  // otelSDK.start()

  const app = await NestFactory.createApplicationContext(CliModule, {
    // logger: false,
  })

  await app.init()
  // await app.close()
}

void bootstrap()
