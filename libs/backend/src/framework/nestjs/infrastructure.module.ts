import { Module } from '@nestjs/common'
import {
  apolloClientConfig,
  ApolloClientModule,
  AwsModule,
  DGraphModule,
  LoggerModule,
} from '../../infrastructure'

@Module({
  imports: [
    LoggerModule.forRoot(),
    AwsModule,
    DGraphModule,
    ApolloClientModule.register(apolloClientConfig),
  ],
})
export class InfrastructureModule {}
