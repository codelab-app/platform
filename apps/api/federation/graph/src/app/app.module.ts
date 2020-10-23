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
  Neo4jNodeModule,
  Neo4jSchemaService,
} from '@codelab/api/services/node'
import { GrpcPropsClientModule } from '@codelab/api/services/props'

@Module({
  imports: [
    GrpcPropsClientModule,
    LoggerModule,
    ConfigModule,
    Neo4jNodeModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jNodeModule],
      inject: [NEO4J_DRIVERS_PROVIDER, Neo4jSchemaService],
      useFactory: (driver: Driver, schemaService: Neo4jSchemaService) => {
        return {
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
    GraphqlNodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
