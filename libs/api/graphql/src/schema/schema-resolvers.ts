import { neo4jgraphql } from 'neo4j-graphql-js'

export const resolvers = {
  // root entry point to GraphQL service
  Query: {
    Movie(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
    MoviesByYear(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
    AllMovies(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
    MovieById(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
    GenresBySubstring(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
    Books(object: any, params: any, ctx: any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true)
    },
  },
}
