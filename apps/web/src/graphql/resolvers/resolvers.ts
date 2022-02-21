import { IResolvers } from '@graphql-tools/utils'
import { mutationResolvers } from './mutationResolvers'
import { queryResolvers } from './query'
import Root from './rootResolvers'

export const resolvers: IResolvers = {
  ...Root,
  Mutation: mutationResolvers,
  Query: queryResolvers,
  // https://github.com/taion/graphql-type-json
  // JSON: GraphQLJSON,
  // JSONObject: GraphQLJSONObject,
}
