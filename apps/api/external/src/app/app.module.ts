import {Module, OnModuleInit} from '@nestjs/common'
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';


import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ConfigModule} from "./config/config.module"
import {ConfigService} from "./config/config.service"
import {GraphQLModule} from "@nestjs/graphql"
import {GraphqlService} from "./graphql/graphql.service"
import {HealthModule} from './health/health.module';
import {RestaurantModule} from './restaurant/restaurant.module';
import {FoodModule} from './food/food.module';
import {SeedDbModule} from "./seed-db/seed-db.module"
import {SeedDbService} from "./seed-db/seed-db.service"

const resetDb = true;

@Module({
  imports: 
  [
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
        synchronize: resetDb,
        dropSchema: resetDb,
        extra: {
          connectionLimit: 5
        }
      } as TypeOrmModuleAsyncOptions
    }
  }),
  GraphQLModule.forRootAsync({
    imports: [ConfigModule],
    useClass: GraphqlService,
    inject: [ConfigService]
  }),
  HealthModule,
  RestaurantModule,
  FoodModule,
  SeedDbModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(public seedDbService: SeedDbService) {}

  async onModuleInit() {
    if (resetDb) {
      await this.seedDbService.seedDB();
    }
  }

}
