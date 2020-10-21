import { join } from 'path'
import { INestApplication, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/config'

const bootstrapMicroservices = async (app: INestApplication) => {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, 'hero/hero.proto'),
    },
  })

  await app.startAllMicroservicesAsync()
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  await bootstrapMicroservices(app)

  // Config
  const config: ConfigService<ApiConfig> = app.get(ConfigService)
  const port = config.get(ApiConfigTypes.SERVICES_PROPS_PORT)

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`)
  })
}

bootstrap()
