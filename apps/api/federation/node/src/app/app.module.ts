import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Driver } from 'neo4j-driver'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import {
  GraphqlNodeModule,
  NEO4J_DRIVERS_PROVIDER,
  Neo4jConnectorModule,
  Neo4jSchemaService,
  UpperCaseDirective
} from '@codelab/api/services/node'

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    // Main
    GraphQLModule.forRootAsync({
      imports: [Neo4jConnectorModule, GraphqlNodeModule],
      inject: [NEO4J_DRIVERS_PROVIDER, Neo4jSchemaService],
      useFactory: (driver: Driver, schemaService: Neo4jSchemaService) => {
        return {
          // schemaDirectives: {
          //   upper: UpperCaseDirective,
          // },
          // buildSchemaOptions: {schemaDirectives: {
          //     upper: UpperCaseDirective,
          //   }},
          include: [GraphqlNodeModule],
          autoSchemaFile: true,
          transformSchema: schemaService.transformSchema,
          transformAutoSchemaFile: true,
          context: (ctx) => ({
            ...ctx,
            driver,
          }),
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
