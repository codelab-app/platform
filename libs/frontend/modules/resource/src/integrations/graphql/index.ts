import {
  IAnyAction,
  IGraphQLActionConfig,
  IGraphQLResourceConfig,
} from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { GraphQlActionImp } from './graphql-action-imp'
import { GraphQLResourceImp } from './graphql-resource-imp'

export const createGraphQLAction = (action: IAnyAction) => {
  const resourceConfig: Nullish<IGraphQLResourceConfig> =
    action.resource?.current.config.values

  const actionConfig = action.config?.values as Maybe<IGraphQLActionConfig>

  if (!resourceConfig) {
    throw new Error('Failed to create Action, missing resource config')
  }

  if (!actionConfig) {
    throw new Error('Failed to create Action, missing action config')
  }

  const resource = new GraphQLResourceImp(resourceConfig)

  return new GraphQlActionImp(
    resource,
    actionConfig,
    action.runOnInit,
    action.body,
  )
}
