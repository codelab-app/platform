import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { ApolloClientService } from './apollo-client.service'
import { ApolloClientConfig } from './config/apollo-client.config'

@Global()
@Module({})
export class ApolloClientModule {
  static register(config: ConfigFactory<ApolloClientConfig>): DynamicModule {
    return {
      imports: [ConfigModule.forFeature(config)],
      module: ApolloClientModule,
      providers: [ApolloClientService],
      exports: [ApolloClientService],
    }
  }
}
