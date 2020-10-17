import { buildFederatedSchema } from '@apollo/federation'
import { FactoryProvider } from '@nestjs/common'
import { GraphQLSchema } from 'graphql'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { resolvers } from './schema-resolvers'
import { typeDefs } from './schema-typedefs'

export const GRAPHQL_SCHEMA_PROVIDER = 'GRAPHQL_SCHEMA_PROVIDER'

export const graphqlSchemaProvider: FactoryProvider<GraphQLSchema> = {
  provide: GRAPHQL_SCHEMA_PROVIDER,
  useFactory: () => {
    const neo4jExtendedSchema = makeAugmentedSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      config: {
        isFederated: true,
      },
    })

    return buildFederatedSchema([neo4jExtendedSchema])
  },
}
