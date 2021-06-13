import { authConfig, AuthModule } from '@codelab/modules/auth-api'
import { Module } from '@nestjs/common'
import {
  ApolloClientModule,
  apolloClientTestConfig,
  DGraphModule,
  GraphqlModule,
  graphqlTestConfig,
} from '../../infrastructure'
import { CacheModule } from '../../infrastructure/cache'
import { dgraphTestConfig } from '../../infrastructure/dgraph/config/dgraph.config'
import { LoggerModule } from '../../infrastructure/logger/logger.module'

@Module({
  imports: [
    LoggerModule.forRoot(),
    // AwsModule,
    GraphqlModule.register(graphqlTestConfig),
    DGraphModule.register(dgraphTestConfig),
    AuthModule.register(authConfig),
    ApolloClientModule.register(apolloClientTestConfig),
    CacheModule.register(),
  ],
  exports: [DGraphModule],
})
export class TestInfrastructureModule {}
