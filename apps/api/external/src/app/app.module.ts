import { Module, OnModuleInit } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import * as shell from 'shelljs'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { FoodModule } from './food/food.module'
import { GraphqlService } from './graphql/graphql.service'
import { HealthModule } from './health/health.module'
import { RestaurantModule } from './restaurant/restaurant.module'
import { SeedDbModule } from './seed-db/seed-db.module'
import { SeedDbService } from './seed-db/seed-db.service'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          host: config.dbHost,
          type: config.dbType,
          port: config.dbPort,
          username: config.dbUsername,
          password: config.dbPassword,
          database: config.db,
          autoLoadEntities: true,
          // synchronize and dropSchema resets the database
          synchronize: config.resetDb,
          dropSchema: config.resetDb,
          logging: ['query', 'error', 'schema'],
          extra: {
            connectionLimit: 5,
          },
        } as TypeOrmModuleAsyncOptions
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GraphqlService,
      inject: [ConfigService],
    }),
    HealthModule,
    RestaurantModule,
    FoodModule,
    SeedDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    public seedDbService: SeedDbService,
    public config: ConfigService,
  ) {}

  async onModuleInit() {
    if (!this.config.resetDb) return

    if (
      shell.exec('make -C apps/api/external hasura-metadata-import').code !== 0
    ) {
      shell.echo('make hasura-metadata-import failed')
      shell.exit(1)
    }

    await this.seedDbService.seedDB()
  }
}
