import {
  dgraphConfig,
  DGraphModule,
  graphqlConfig,
  GraphqlModule,
  serverConfig,
} from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConsoleModule } from 'nestjs-console'
import { ApiServerModule } from '../api-server/api-server.module'
import { GraphqlCodegenModule } from '../graphql-codegen/graphql-codegen.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConsoleModule,
    ApiServerModule,
    DGraphModule.register(dgraphConfig),
    GraphqlModule,
    GraphqlCodegenModule,
    ConfigModule.forFeature(graphqlConfig),
    ConfigModule.forFeature(serverConfig),
    ConfigModule.forFeature(dgraphConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
