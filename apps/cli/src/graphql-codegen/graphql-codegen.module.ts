import {
  dgraphConfig,
  DgraphTokens,
  graphqlSchemaConfig,
  GraphqlSchemaModule,
  GraphqlSchemaTokens,
  graphqlServerConfig,
  GraphqlServerTokens,
  serverConfig,
  ServerTokens,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ServerModule } from '../server/server.module'
import { GraphqlCodegenService } from './graphql-codegen.service'

@Module({
  imports: [GraphqlSchemaModule, ServerModule.register(graphqlServerConfig)],
  providers: [
    GraphqlCodegenService,
    {
      provide: GraphqlSchemaTokens.GraphqlSchemaConfig,
      useValue: graphqlSchemaConfig(),
    },
    {
      provide: DgraphTokens.DgraphConfig,
      useValue: dgraphConfig(),
    },
    {
      provide: ServerTokens.ServerConfig,
      useValue: serverConfig(),
    },
    {
      provide: GraphqlServerTokens.GraphqlServerConfig,
      useValue: graphqlServerConfig(),
    },
  ],
  exports: [GraphqlCodegenService],
})
export class GraphqlCodegenModule {}
