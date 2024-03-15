import { NestFactory } from '@nestjs/core'
import { CliModule } from './cli.module'

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(CliModule, {})

  await app.init()
}

void bootstrap()
