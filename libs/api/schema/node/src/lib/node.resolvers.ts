import { GraphQLResolverMap } from 'apollo-graphql'

const nodes = [
  {
    id: 1,
    type: 'React.Button',
  },
  { id: 2, type: 'React.Div' },
]

export const resolvers: GraphQLResolverMap = {
  Query: {
    // Movie(object: any, params: any, ctx: any, resolveInfo: any) {
    //   return neo4jgraphql(object, params, ctx, resolveInfo, true)
    // },
  },
  Node: {
    __resolveReference(node) {
      return nodes.find(({ id }) => id === node.id)
    },
    // props: async (object: any, params: any, ctx: any, resolveInfo: any) => {
    //   console.log(object, params, ctx, resolveInfo)
    //
    //   console.log('resolving prop')
    // },
  },
}
