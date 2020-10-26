import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { HttpLink } from 'apollo-link-http'
import {
  GraphQLSchema,
  buildSchema as buildSchemaGraphql,
  printSchema,
} from 'graphql'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from 'graphql-tools'
import nodeFetch from 'node-fetch'
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
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      transformSchema: async (schema: GraphQLSchema) => {
        // console.log('localSchema', schema.getQueryType());
        // console.log('remote', remoteExecutableSchema.getQueryType());
        return mergeSchemas({
          schemas: [schema, remoteExecutableSchema],
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
      const httpLink = new HttpLink({
        uri: this.config.graphQLEngineURI,
        fetch: nodeFetch as any,
        headers: {
          'X-Hasura-Access-Key': this.config.graphQLEngineAccessKey,
        },
      })

      const remoteIntrospectedSchema = await introspectSchema(httpLink)

      const remoteSchema = printSchema(remoteIntrospectedSchema)
      const buildedHasuraSchema = buildSchemaGraphql(remoteSchema)

      const remoteExecutableSchema = makeRemoteExecutableSchema({
        schema: buildedHasuraSchema,
        // schema: remoteSchema,
        link: httpLink,
      })

      return Promise.resolve(remoteExecutableSchema)
    } catch (err) {
      console.log(err)

      return Promise.reject(err)
    }
  }
}
