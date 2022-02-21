import { IResolvers } from '@graphql-tools/utils'
import Mutation from './mutationResolvers'
import Query from './queryResolvers'
import Root from './rootResolvers'

export const resolvers: IResolvers = {
  ...Root,
  Mutation,
  Query,
  // https://github.com/taion/graphql-type-json
  // JSON: GraphQLJSON,
  // JSONObject: GraphQLJSONObject,
}
