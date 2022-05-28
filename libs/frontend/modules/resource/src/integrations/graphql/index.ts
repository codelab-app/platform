import {
  IGraphQLActionConfig,
  IGraphQLResourceConfig,
} from '@codelab/shared/abstract/core'
import { GraphQlActionImp } from './graphql-action-imp'
import { GraphQLResourceImp } from './graphql-resource-imp'

export const createGraphQLAction = (
  resourceConfig: IGraphQLResourceConfig,
  actionConfig: IGraphQLActionConfig,
  runOnInit: boolean,
) => {
  const resource = new GraphQLResourceImp(resourceConfig)

  return new GraphQlActionImp(resource, actionConfig, runOnInit)
}
