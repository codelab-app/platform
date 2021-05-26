import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import path from 'path'

@Injectable()
export class GraphqlConfig implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: path.join(process.cwd(), 'schema.api.graphql'),
      installSubscriptionHandlers: true,
      // transformSchema: async (schema: GraphQLSchema) => {
      //   // return stitchSchemas({
      //   //   subschemas: [schema, remoteExecutableSchema],
      //   //   mergeTypes: true,
      //   // })
      // },
      // transformAutoSchemaFile: true,
      path: '/graphql',
      debug: true,
      tracing: true,
      playground: true,
      context: ({ req }) => {
        // console.log(req.headers)

        return { req }
      },
      formatError: (err: GraphQLError) => {
        //See if there is a nested graphQLErrors array and parse it to a (kind of) readable error message
        const graphqlAggregateError =
          err?.extensions?.exception?.graphQLErrors?.reduce(
            (p: string, gqlErr: any) =>
              `${p ? p + '; ' : ''}${gqlErr.path.reduce(
                (prev: string, pathStr: string) => prev + '.' + pathStr,
              )} ${gqlErr.message}`,
            '',
          )

        const gqlIssues = err?.extensions?.exception?.issues

        const zodError =
          Array.isArray(gqlIssues) &&
          gqlIssues[0] &&
          gqlIssues[0].code &&
          gqlIssues[0].path
            ? `Zod validation error. ${
                gqlIssues[0].message
              }. Path: ${gqlIssues[0].path.reduce(
                (prev: string, next: string) =>
                  `${prev ? prev + ' ->' : ''} ${next}`,
                '',
              )}`
            : null

        //If not - see if there's a general message somewhere inside the error and use that
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            graphqlAggregateError ||
            zodError ||
            err?.extensions?.exception?.response?.message ||
            err?.extensions?.exception?.message ||
            err?.message,
        }

        return graphQLFormattedError
      },
    }
  }
}
