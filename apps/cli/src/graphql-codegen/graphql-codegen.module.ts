import {
  dgraphConfig,
  DgraphModule,
  graphqlSchemaConfig,
  GraphqlSchemaModule,
  GraphqlServerModule,
  serverConfig,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServerModule } from '../server/server.module'
import { GraphqlCodegenService } from './graphql-codegen.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dgraphConfig, serverConfig, graphqlSchemaConfig],
    }),
    GraphqlServerModule,
    GraphqlSchemaModule,
    DgraphModule,
    ServerModule,
  ],
  providers: [GraphqlCodegenService],
  exports: [GraphqlCodegenService],
})
export class GraphqlCodegenModule {}
