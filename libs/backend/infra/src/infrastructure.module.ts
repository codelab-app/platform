import { Module } from '@nestjs/common'
import { AuthModule, AwsModule, LoggerModule } from './adapters'
import {
  ApolloClientModule,
  DgraphModule,
  GraphqlSchemaModule,
  GraphqlServerModule,
} from './ports'

@Module({
  imports: [
    AwsModule,
    LoggerModule,
    ApolloClientModule,
    GraphqlSchemaModule,
    GraphqlServerModule,
    AuthModule,
    DgraphModule,
  ],
})
export class InfrastructureModule {}
