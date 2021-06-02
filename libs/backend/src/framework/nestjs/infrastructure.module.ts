import { authConfig, AuthModule } from '@codelab/modules/auth-api'
import { Module } from '@nestjs/common'
import {
  apolloClientConfig,
  ApolloClientModule,
  AwsModule,
  DGraphModule,
  graphqlConfig,
  GraphqlModule,
  LoggerModule,
} from '../../infrastructure'
import { CacheModule } from '../../infrastructure/cache'
import { dgraphConfig } from '../../infrastructure/dgraph/config/dgraph.config'

@Module({
  imports: [
    LoggerModule.forRoot(),
    GraphqlModule.register(graphqlConfig),
    CacheModule.register(),
    AuthModule.register(authConfig),
    DGraphModule.register(dgraphConfig),
    ApolloClientModule.register(apolloClientConfig),
    AwsModule,
  ],
})
export class InfrastructureModule {}
