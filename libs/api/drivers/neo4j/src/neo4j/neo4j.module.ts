import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { NEO4J_DRIVER_PROVIDER, Neo4jDriversModule } from '../drivers'
import { GRAPHQL_SCHEMA_PROVIDER, SchemaModule } from '../schema'

@Module({
  imports: [
    SchemaModule,
    Neo4jDriversModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jDriversModule, SchemaModule],
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
export class Neo4jModule {}
