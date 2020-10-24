import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';
import {ConfigService} from '../config/config.service';
import {HttpLink} from 'apollo-link-http';
import nodeFetch from 'node-fetch';
import {buildSchema as buildSchemaGraphql, GraphQLSchema, print, printSchema} from 'graphql';
import {introspectSchema, makeRemoteExecutableSchema, mergeSchemas} from 'graphql-tools';
import { linkToExecutor } from '@graphql-tools/links';

const { query } = require('graphqurl');


const CONSTRUCTOR_NAME = 'GraphqlService';


@Injectable()
export class GraphqlService implements GqlOptionsFactory {

  
  constructor(private readonly config: ConfigService) {
    
  }


  async createGqlOptions(): Promise<GqlModuleOptions> {
    let remoteExecutableSchema: any = null;
    try {
      remoteExecutableSchema = await this.createRemoteSchema();
    } catch (e) {}
    
    return {
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      transformSchema: async (schema: GraphQLSchema) => {
        console.log('localSchema', schema);
        return mergeSchemas({
          schemas: [
            schema,
            remoteExecutableSchema
          ],
        });
      },

      path: '/graphql',
      debug: this.config.GQLConfig.debug,
      tracing: this.config.GQLConfig.tracing,
      playground: this.config.GQLConfig.playground
    }
  };



  private async createRemoteSchema(): Promise<GraphQLSchema> {
    try {
      const httpLink = new HttpLink({
        uri: this.config.graphQLEngineURI,
        fetch: nodeFetch as any,
        headers: {
          "X-Hasura-Access-Key": this.config.graphQLEngineAccessKey
        }
      });

      const executor = linkToExecutor(httpLink);

      // const remoteIntrospectedSchema = await introspectSchema(httpLink);
      const remoteIntrospectedSchema = await introspectSchema(executor);
      
      const remoteSchema = printSchema(remoteIntrospectedSchema);
      // const resolvers = extractResolversFromSchema(remoteSchema);
      // console.log('remoteSchema', remoteSchema);
      const buildedHasuraSchema = buildSchemaGraphql(remoteSchema);
      
      const remoteExecutableSchema = makeRemoteExecutableSchema({
        // schema: buildedHasuraSchema,
        schema: remoteSchema,
        executor
      });

      // const remoteExecutableSchema = wrapSchema({
      //   schema: await introspectSchema(executor),
      //   executor,
      // });

      return Promise.resolve(remoteExecutableSchema);
    }
    catch (err) {
      console.log('error:!!!!')
      console.log(err);
      return Promise.reject(err);
    }
  }

}
