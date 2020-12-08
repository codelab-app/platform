import { ExecutionParams } from '@graphql-tools/delegate'
import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { GraphQLSchema, print } from 'graphql'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  stitchSchemas,
} from 'graphql-tools'
import { ConfigService } from '../config/config.service'

const CONSTRUCTOR_NAME = 'GraphqlService'

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    let remoteExecutableSchema: any = null

    try {
      remoteExecutableSchema = await this.createRemoteSchema()
    } catch (e) {
      console.log(e)
    }

    return {
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      transformSchema: async (schema: GraphQLSchema) => {
        return stitchSchemas({
          subschemas: [schema, remoteExecutableSchema],
          mergeTypes: true,
        })
      },

      path: '/graphql',
      debug: this.config.GQLConfig.debug,
      tracing: this.config.GQLConfig.tracing,
      playground: this.config.GQLConfig.playground,
    }
  }

  private async createRemoteSchema(): Promise<GraphQLSchema> {
    try {
      const adminExecutor = async ({
        document,
        variables,
      }: ExecutionParams) => {
        const query = print(document)
        const uri = this.config.graphQLEngineURI as string
        const fetchResult = await fetch(uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': this.config.graphQLEngineAccessKey,
          },
          body: JSON.stringify({ query, variables }),
        })

        return fetchResult.json()
      }
      const remote: GraphQLSchema = await introspectSchema(adminExecutor)

      const remoteExecutableSchema = makeRemoteExecutableSchema({
        schema: remote,
        executor: adminExecutor,
      })

      return Promise.resolve(remoteExecutableSchema)
    } catch (err) {
      console.log(err)

      return Promise.reject(err)
    }
  }
}
