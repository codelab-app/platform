import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GRAPHQL_SCHEMA_PROVIDER, SchemaModule } from '../schema'
import { NEO4J_DRIVER_PROVIDER, Neo4jModule } from '@codelab/api/neo4j'

@Module({
  imports: [
    SchemaModule,
    Neo4jModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jModule, SchemaModule],
      inject: [NEO4J_DRIVER_PROVIDER, GRAPHQL_SCHEMA_PROVIDER],
      useFactory: (driver, schema) => ({
        schema,
        context: ({ req }) => ({
          driver,
          req,
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
