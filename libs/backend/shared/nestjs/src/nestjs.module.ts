import {
  ApolloClientModule,
  AwsModule,
  DgraphModule,
  GraphqlSchemaModule,
  GraphqlServerModule,
  LoggerModule,
  Neo4jModule,
} from '@codelab/backend/infra'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthModule } from '@codelab/backend/modules/user'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    AuthModule,
    AwsModule,
    LoggerModule,
    ApolloClientModule,
    GraphqlSchemaModule,
    GraphqlServerModule,
    DgraphModule,
    // Neo4jModule,
  ],
})
export class NestjsModule {}
