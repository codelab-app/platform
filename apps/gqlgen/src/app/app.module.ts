import {
  dgraphConfig,
  DgraphModule,
  DgraphTokens,
  graphqlSchemaConfig,
  GraphqlSchemaModule,
  GraphqlSchemaTokens,
  graphqlServerConfig,
  GraphqlServerModule,
  GraphqlServerTokens,
  serverConfig,
  ServerTokens,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { ApiServerModule } from '../api-server/api-server.module'
import { GraphqlCodegenModule } from '../graphql-codegen/graphql-codegen.module'
import { AppService } from './app.service'

@Module({
  imports: [
    ConsoleModule,
    ApiServerModule.register(graphqlServerConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    GraphqlCodegenModule,
    DgraphModule.register(dgraphConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
  ],
  providers: [
    AppService,
    {
      provide: ServerTokens.ServerConfig,
      useValue: serverConfig(),
    },
    {
      provide: GraphqlSchemaTokens.GraphqlSchemaConfig,
      useValue: graphqlSchemaConfig(),
    },
    {
      provide: GraphqlServerTokens.GraphqlServerConfig,
      useValue: graphqlServerConfig(),
    },
    {
      provide: DgraphTokens.DgraphConfig,
      useValue: dgraphConfig(),
    },
  ],
})
export class AppModule {}
