import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { LoggerModule } from '@codelab/api/logger'
import { PropsModule } from '@codelab/api/schema/props'

@Module({
  imports: [
    LoggerModule,
    GraphQLFederationModule.forRootAsync({
      imports: [PropsModule],
      useFactory: () => {
        return {
          include: [PropsModule],
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
