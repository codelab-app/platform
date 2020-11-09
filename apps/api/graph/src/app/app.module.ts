import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as shell from 'shelljs'
import { EdgeModule, GraphModule, UserModule, VertexModule } from '../models'
import { SeedDbService } from '../seed-db'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {
  ConfigGraphqlHasuraService,
  ConfigModule,
  ConfigTypeormHasuraService,
} from '@codelab/api/providers/config'

@Module({
  imports: [
    // RouterModule,
    // LoggerModule,
    ConfigModule,
    // SeedDbModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: ConfigTypeormHasuraService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigGraphqlHasuraService,
      inject: [ConfigService],
    }),
    // Our models
    EdgeModule,
    VertexModule,
    GraphModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(public seedDbService: SeedDbService) {}

  async onModuleInit() {
    if (process.argv.includes('--reset')) {
      if (
        shell.exec(
          `npx hasura metadata apply \
          --project apps/api/graph/.hasura \
          --envfile .env`,
        ).code !== 0
      ) {
        shell.echo('"hasura metadata apply" failed')
        shell.exit(1)
      }

      await this.seedDbService.seedDB()
    }
  }
}
