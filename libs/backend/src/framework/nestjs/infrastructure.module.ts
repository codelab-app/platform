import { Module } from '@nestjs/common'
import {
  apolloClientConfig,
  ApolloClientModule,
  AwsModule,
  DGraphModule,
  GraphqlModule,
  LoggerModule,
} from '../../infrastructure'

@Module({
  imports: [
    LoggerModule.forRoot(),
    GraphqlModule,
    AwsModule,
    DGraphModule,
    ApolloClientModule.register(apolloClientConfig),
  ],
})
export class InfrastructureModule {}
