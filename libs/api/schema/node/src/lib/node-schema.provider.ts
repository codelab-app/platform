import { buildFederatedSchema } from '@apollo/federation'
import { FactoryProvider } from '@nestjs/common'
import { GraphQLSchema } from 'graphql'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import { typeDefs } from './node-typedefs'
import { resolvers } from './node.resolvers'

export const NODE_SCHEMA_PROVIDER = 'NODE_SCHEMA_PROVIDER'

export const nodeSchemaProvider: FactoryProvider<GraphQLSchema> = {
  provide: NODE_SCHEMA_PROVIDER,
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
