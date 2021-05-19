import { Module } from '@nestjs/common'
import {
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
    ApolloClientModule,
  ],
})
export class InfrastructureModule {}
