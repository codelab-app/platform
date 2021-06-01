import { Module } from '@nestjs/common'
import {
  apolloClientConfig,
  ApolloClientModule,
  AwsModule,
  DGraphModule,
  GraphqlModule,
  LoggerModule,
} from '../../infrastructure'
import { CacheModule } from '../../infrastructure/cache'

@Module({
  imports: [
    LoggerModule.forRoot(),
    GraphqlModule,
    CacheModule.register(),
    AwsModule,
    DGraphModule,
    ApolloClientModule.register(apolloClientConfig),
  ],
})
export class InfrastructureModule {}
