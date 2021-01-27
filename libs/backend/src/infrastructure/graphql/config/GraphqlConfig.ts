import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

@Injectable()
export class GraphqlConfig implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
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
      context: ({ req }) => ({ req }),
      formatError: (err: GraphQLError) => {
        console.log('GraphqlConfig.formatError...')
        console.log(err)

        // Don't give the specific errors to the client.
        // const a = err;
        // if (err.message.startsWith("Nothing was")) {
        //
        // }
        // return new Error('Internal server error');
        // Otherwise return the original error.  The error can also
        // be manipulated in other ways, so long as it's returned.
        return err
      },
    }
  }
}
