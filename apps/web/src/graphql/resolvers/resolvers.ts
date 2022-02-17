import { IResolvers } from '@graphql-tools/utils'
import { mutationResolvers } from './mutationResolvers'
import { queryResolvers } from './queryResolvers'

export const resolvers: IResolvers = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
  // https://github.com/taion/graphql-type-json
  // JSON: GraphQLJSON,
  // JSONObject: GraphQLJSONObject,
}
