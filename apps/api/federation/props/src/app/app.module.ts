import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {
  ApiConfig,
  ApiConfigTypes,
  ConfigModule,
} from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import {
  GraphqlPropsModule,
  MongoosePropsModule,
} from '@codelab/api/services/props'

@Module({
  imports: [
    LoggerModule,
    // Main
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<ApiConfig>) => {
        return {
          uri: config.get(ApiConfigTypes.MONGO_ENDPOINT),
        }
      },
    }),
    MongoosePropsModule,
    GraphQLFederationModule.forRootAsync({
      imports: [GraphqlPropsModule],
      useFactory: () => {
        return {
          include: [GraphqlPropsModule],
          autoSchemaFile: true,
          // here provide all the types that are missing in schema
          // since we're not importing .graphql typedefs
          buildSchemaOptions: { orphanedTypes: [] },
        }
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
