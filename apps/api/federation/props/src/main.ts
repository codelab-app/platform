import { join } from 'path'
import { INestApplication, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { GrpcOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'
import { AppModule } from './app/app.module'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

const bootstrapMicroservices = async (app: INestApplication) => {
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'api.federation.props',
      url: 'localhost:50051',
      protoPath: join(
        process.cwd(),
        'apps/api/federation/props/src/proto/props.proto',
      ),
    },
  })

  await app.startAllMicroservicesAsync()
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  // Config
  const config: ConfigService<ApiConfig> = app.get(ConfigService)
  const port = config.get(ApiConfigTypes.FEDERATION_PROPS_PORT)

  await bootstrapMicroservices(app)

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`)
  })
}

bootstrap()
