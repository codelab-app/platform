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
    titties: () => {
      return ''
    },
  },
  Node: {
    __resolveReference(node) {
      console.log('test')

      return nodes.find(({ id }) => id === node.id)
    },
    // props: async (object: any, params: any, ctx: any, resolveInfo: any) => {
    //   console.log(object, params, ctx, resolveInfo)
    //
    //   console.log('resolving prop')
    // },
  },
}
