import {
  dgraphConfig,
  DGraphModule,
  GraphqlModule,
  serverConfig,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConsoleModule } from 'nestjs-console'
import { ApiServerModule } from '../../api-server/api-server.module'
import { GraphqlCodegenModule } from '../../graphql-codegen/graphql-codegen.module'
import { appDevProvider } from './app-dev.providers'
import { AppDevTokens } from './config/app-dev.tokens'

@Module({
  imports: [
    ConsoleModule,
    ApiServerModule,
    DGraphModule.register(dgraphConfig),
    GraphqlModule,
    GraphqlCodegenModule,
    ConfigModule,
    // ConfigModule.forFeature(graphqlConfig),
    ConfigModule.forFeature(serverConfig),
    // ConfigModule.forFeature(dgraphConfig),
  ],
  providers: [appDevProvider],
  exports: [AppDevTokens.AppDevService],
})
export class AppDevModule {}
