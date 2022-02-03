import { IResolvers } from '@graphql-tools/utils'
import { mutationResolvers } from './mutationResolvers'

export const resolvers: IResolvers = {
  Mutation: mutationResolvers,
  Query: {},
  // https://github.com/taion/graphql-type-json
  // JSON: GraphQLJSON,
  // JSONObject: GraphQLJSONObject,
}
