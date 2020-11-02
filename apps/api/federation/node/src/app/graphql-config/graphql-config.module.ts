import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Driver } from 'neo4j-driver'
import {
  GraphqlNodeModule,
  NEO4J_DRIVERS_PROVIDER,
  Neo4jConnectorModule,
  Neo4jSchemaService,
} from '@codelab/api/services/node'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [Neo4jConnectorModule, GraphqlNodeModule],
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
  ],
})
export class GraphqlConfigModule {}
