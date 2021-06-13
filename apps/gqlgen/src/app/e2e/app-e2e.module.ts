import {
  DGraphModule,
  dgraphTestConfig,
  GraphqlModule,
  serverConfig,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConsoleModule } from 'nestjs-console'
import { ApiServerModule } from '../../api-server/api-server.module'
import { GraphqlCodegenModule } from '../../graphql-codegen/graphql-codegen.module'
import { appE2eProvider } from './app-e2e.providers'
import { AppE2eTokens } from './config/app-e2e.tokens'

@Module({
  imports: [
    ConsoleModule,
    ApiServerModule,
    DGraphModule.register(dgraphTestConfig),
    GraphqlModule,
    GraphqlCodegenModule,
    ConfigModule,
    // ConfigModule.forFeature(graphqlTestConfig),
    ConfigModule.forFeature(serverConfig),
    // ConfigModule.forFeature(dgraphTestConfig),
  ],
  providers: [appE2eProvider],
  exports: [AppE2eTokens.AppE2eService],
})
export class AppE2eModule {}
