import { buildFederatedSchema } from '@apollo/federation'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLSchema } from 'graphql'
import { printSchema } from 'graphql/utilities'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'
import { GraphqlNodeModule } from '../graphql'
import { NEO4J_DATABASE_PROVIDER, Neo4jDatabaseModule } from './database'
import { Neo4jNodeController } from './neo4j-node.controller'
import { Neo4jNodeService } from './neo4j-node.service'

@Module({
  imports: [
    Neo4jDatabaseModule,
    GraphqlNodeModule,
    GraphQLModule.forRootAsync({
      imports: [Neo4jDatabaseModule],
      inject: [NEO4J_DATABASE_PROVIDER],
      useFactory: (driver) => {
        return {
          include: [GraphqlNodeModule],
          autoSchemaFile: true,
          // Here schema already has federation added
          transformSchema: (schema: GraphQLSchema) => {
            const resolvers = extractResolversFromSchema(schema)

            // Our user defined schema
            const typeDefs: string = printSchema(schema)

            const neo4jExtendedSchema = makeAugmentedSchema({
              resolvers,
              typeDefs,
              config: {
                isFederated: true,
              },
            })

            return buildFederatedSchema([neo4jExtendedSchema])
          },
          transformAutoSchemaFile: true,
          context: (ctx) => ({
            ...ctx,
            driver,
          }),
        }
      },
    }),
  ],
  controllers: [Neo4jNodeController],
  providers: [Neo4jNodeService],
  exports: [],
})
export class Neo4jNodeModule {}
