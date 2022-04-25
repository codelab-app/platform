import {
  IGraphQLOperationConfig,
  IGraphQLResourceConfig,
} from '@codelab/shared/abstract/core'
import { GraphQlOperation } from './graphql-operation'
import { GraphQLResource } from './graphql-resource'

export const createGraphQLOperation = (
  resourceConfig: IGraphQLResourceConfig,
  operationConfig: IGraphQLOperationConfig,
  runOnInit: boolean,
) => {
  const resource = new GraphQLResource(resourceConfig)

  return new GraphQlOperation(resource, operationConfig, runOnInit)
}
