import { IResolvers } from '@graphql-tools/utils'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'

export const resolvers: IResolvers = {
  Mutation: {
    importAtoms: async (_source, ctx) => {
      console.log('importAtoms', _source, ctx)

      return Promise.resolve({ atoms: [] })
    },
  },
  Query: {},
  // https://github.com/taion/graphql-type-json
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
}
