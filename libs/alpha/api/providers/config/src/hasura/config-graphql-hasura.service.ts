import { ExecutionParams, Executor } from '@graphql-tools/delegate'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { fetch } from 'cross-fetch'
import { GraphQLError, GraphQLSchema, print } from 'graphql'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  stitchSchemas,
} from 'graphql-tools'
import { ApiConfig, ApiConfigTypes } from '../config'

@Injectable()
export class ConfigGraphqlHasuraService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    let remoteExecutableSchema: any = null

    try {
      remoteExecutableSchema = await this.createRemoteSchema()
    } catch (e) {
      console.log(e)
    }

    return {
      autoSchemaFile: true,
      installSubscriptionHandlers: false,
      transformSchema: async (schema: GraphQLSchema) => {
        return stitchSchemas({
          subschemas: [schema, remoteExecutableSchema],
          mergeTypes: true,
        })
      },
      transformAutoSchemaFile: true,
      path: '/graphql',
      debug: true,
      tracing: true,
      playground: true,
      context: ({ req }) => ({ req }),
      formatError: (err: GraphQLError) => {
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

  /**
   * https://hasura.io/blog/hasura-authentication-explained/
   * (1) Admin secret - access to all resources
   * (2) JWT
   * (3) Webhook
   * (4) Unauthenticated
   */
  private async createRemoteSchema(): Promise<GraphQLSchema> {
    /**
     * HttpLink with Hasura admin secret set, allows access to all hasura resources.
     *
     * We only use this for server-to-server access in order to build remote schema
     */
    const adminExecutor = async ({ document, variables }: ExecutionParams) => {
      const query = print(document)
      const uri = this.config.get(ApiConfigTypes.HASURA_GRAPHQL_URI) as string
      const hasuraSecret = this.config.get(
        ApiConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET,
      ) as string
      const fetchResult = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': hasuraSecret,
        },
        body: JSON.stringify({ query, variables }),
      })

      return fetchResult.json()
    }

    /**
     *  This will trigger every time there is a graphql request through this server to hasura
     *  we will use it to pass JWT to Hasura
     */
    const jwtExecutor: Executor = async ({
      document,
      variables,
      context,
    }: ExecutionParams) => {
      const query = print(document)
      const { authorization } = context?.req?.headers
      const uri = this.config.get(ApiConfigTypes.HASURA_GRAPHQL_URI) as string
      const fetchResult = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
        body: JSON.stringify({ query, variables }),
      })

      return fetchResult.json()
    }

    try {
      const remote: GraphQLSchema = await introspectSchema(adminExecutor)

      const remoteExecutableSchema = makeRemoteExecutableSchema({
        schema: remote,
        executor: jwtExecutor,
      })

      return Promise.resolve(remoteExecutableSchema)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
