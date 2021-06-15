import {
  dgraphConfig,
  DGraphModule,
  graphqlServerConfig,
  GraphqlServerModule,
  serverConfig,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
    ConfigModule,
    // ConfigModule.forFeature(graphqlConfig),
    ConfigModule.forFeature(serverConfig),
    ConfigModule.forFeature(dgraphConfig),
  ],
  providers: [AppService],
})
export class AppModule {}
