export const resolvers = {
  // root entry point to GraphQL service
  Query: {
    // Movie(object: any, params: any, ctx: any, resolveInfo: any) {
    //   return neo4jgraphql(object, params, ctx, resolveInfo, true)
    // },
  },
  Node: {
    props: async (object: any, params: any, ctx: any, resolveInfo: any) => {
      console.log(object, params, ctx, resolveInfo)

      console.log('resolving prop')
    },
  },
}
