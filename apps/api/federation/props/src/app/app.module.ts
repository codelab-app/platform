import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import {
  GraphqlPropsModule,
  GrpcPropsServerModule,
  MongoosePropsModule,
} from '@codelab/api/services/props'

@Module({
  imports: [
    MongoosePropsModule,
    GrpcPropsServerModule,
    LoggerModule,
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
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
