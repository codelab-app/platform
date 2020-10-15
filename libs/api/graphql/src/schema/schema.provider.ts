import { FactoryProvider } from '@nestjs/common'
import { GraphQLSchema } from 'graphql'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { resolvers } from './schema-resolvers'
import { typeDefs } from './schema-typedefs'

export const GRAPHQL_SCHEMA_PROVIDER = 'GRAPHQL_SCHEMA_PROVIDER'

export const graphqlSchemaProvider: FactoryProvider<Promise<GraphQLSchema>> = {
  provide: GRAPHQL_SCHEMA_PROVIDER,
  useFactory: () => {
    return makeAugmentedSchema({
      typeDefs,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      resolvers,
    })
  },
}
