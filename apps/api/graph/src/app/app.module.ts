import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../models/auth/auth.module'
import { EdgeModule } from '../models/edge/edge.module'
import { GraphModule } from '../models/graph/graph.module'
import { UserModule } from '../models/user/user.module'
import { VertexModule } from '../models/vertex/vertex.module'
import { SeedDbModule } from '../seed-db/seed-db.module'
import { SeedDbService } from '../seed-db/seed-db.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {
  ApiConfig,
  ApiConfigTypes,
  ConfigGraphqlHasuraService,
  ConfigModule,
  ConfigTypeormHasuraService,
} from '@codelab/api/providers/config'

@Module({
  imports: [
    // RouterModule,
    // LoggerModule,
    ConfigModule,
    SeedDbModule,
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly seedDbService: SeedDbService,
    private readonly config: ConfigService<ApiConfig>,
  ) {
    console.log('CODELAB_ENV', this.config.get(ApiConfigTypes.CODELAB_ENV))
  }

  async onModuleInit() {
    // if (isDev && shell.exec('make hasura-metadata-apply').code !== 0) {
    //   shell.echo('make hasura-metadata-apply failed')
    //   shell.exit(1)
    // }

    if (this.config.get(ApiConfigTypes.TYPEORM_SEED)) {
      // await this.seedDbService.seedDB()
    }
  }
}
