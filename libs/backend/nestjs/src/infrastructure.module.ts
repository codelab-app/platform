import {
  ApolloClientModule,
  DgraphModule,
  GraphqlSchemaModule,
  GraphqlServerModule,
  LoggerModule,
} from '@codelab/backend/infra'
import { AuthModule } from '@codelab/backend/modules/user'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    LoggerModule,
    ApolloClientModule,
    GraphqlSchemaModule,
    GraphqlServerModule,
    AuthModule,
    DgraphModule,
  ],
})
export class InfrastructureModule {}
