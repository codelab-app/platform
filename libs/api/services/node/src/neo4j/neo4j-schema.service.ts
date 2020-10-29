import { buildFederatedSchema } from '@apollo/federation'
import { Injectable } from '@nestjs/common'
import { GraphQLSchema } from 'graphql'
import { printSchema } from 'graphql/utilities'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'

@Injectable()
export class Neo4jSchemaService {
  /**
   * Augment schema with Neo4j + Federation
   *
   * @param schema Nest.js code first schema
   */
  transformSchema(schema: GraphQLSchema) {
    // console.log(schema.getDirectives())

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
  }
}
