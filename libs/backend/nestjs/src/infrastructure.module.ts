import {
  ApolloClientModule,
  AwsModule,
  DgraphModule,
  GraphqlSchemaModule,
  GraphqlServerModule,
  LoggerModule,
} from '@codelab/backend/infra'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthModule } from '@codelab/backend/modules/user'
import { Module } from '@nestjs/common'

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
