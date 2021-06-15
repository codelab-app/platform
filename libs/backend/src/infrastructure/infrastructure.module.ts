import { authConfig, AuthModule } from '@codelab/modules/auth-api'
import { Module } from '@nestjs/common'
import { CacheModule } from './cache'
import { dgraphConfig } from './dgraph'
import {
  apolloClientConfig,
  ApolloClientModule,
  AwsModule,
  DGraphModule,
  GraphqlSchemaModule,
  graphqlServerConfig,
  GraphqlServerModule,
  LoggerModule,
} from './index'

@Module({
  imports: [
    // LoggerModule.forRoot(),
    GraphqlSchemaModule.register(dgraphConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    CacheModule.register(),
    AuthModule.register(authConfig),
    DGraphModule.register(dgraphConfig),
    ApolloClientModule.register(apolloClientConfig),
    AwsModule,
  ],
  exports: [DGraphModule],
})
export class InfrastructureModule {}
