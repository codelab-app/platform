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
  PuppeteerModule,
  SeedDbModule,
  serverConfig,
  ServerTokens,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { GraphqlCodegenModule } from '../graphql-codegen/graphql-codegen.module'
import { ServerModule } from '../server/server.module'
import { AppService } from './app.service'

@Module({
  imports: [
    ConsoleModule,
    ServerModule.register(graphqlServerConfig),
    GraphqlServerModule.register(graphqlServerConfig),
    GraphqlCodegenModule,
    DgraphModule.register(dgraphConfig),
    GraphqlSchemaModule.register(dgraphConfig, graphqlSchemaConfig),
    SeedDbModule,
    PuppeteerModule,
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
