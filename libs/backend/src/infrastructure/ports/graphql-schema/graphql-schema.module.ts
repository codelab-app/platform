import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { DgraphConfig, DgraphTokens } from '../dgraph'
import { GraphqlSchemaConfig } from './config/graphql-schema.config'
import { GraphqlSchemaTokens } from './config/graphql-schema.tokens'
import { GraphqlSchemaService } from './graphql-schema.service'

@Module({})
export class GraphqlSchemaModule {
  static register(
    dgraphConfig: ConfigFactory<DgraphConfig>,
    graphqlSchemaConfig: ConfigFactory<GraphqlSchemaConfig>,
  ): DynamicModule {
    // Logger.verbose(
    //   `${DgraphTokens.DgraphConfig.toString()} \n${JSON.stringify(
    //     dgraphConfig(),
    //     null,
    //     '  ',
    //   )}`,
    // )

    // Logger.verbose(
    //   `${GraphqlSchemaTokens.GraphqlSchemaConfig.toString()} \n${JSON.stringify(
    //     graphqlSchemaConfig(),
    //     null,
    //     '  ',
    //   )}`,
    // )

    return {
      providers: [
        { provide: DgraphTokens.DgraphConfig, useValue: dgraphConfig() },
        {
          provide: GraphqlSchemaTokens.GraphqlSchemaConfig,
          useValue: graphqlSchemaConfig(),
        },
        GraphqlSchemaService,
      ],
      exports: [GraphqlSchemaService],
      module: GraphqlSchemaModule,
    }
  }
}
