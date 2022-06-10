import {
  IAnyAction,
  IRestActionConfig,
  IRestResourceConfig,
} from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { RestActionImp } from './rest-action-imp'
import { RestResourceImp } from './rest-resource-imp'

export const createRestAction = (action: IAnyAction) => {
  const resourceConfig: Nullish<IRestResourceConfig> =
    action.resource?.current.config.values

  const actionConfig = action.config?.values as Maybe<IRestActionConfig>

  if (!resourceConfig) {
    throw new Error('Failed to create Action, missing resource config')
  }

  if (!actionConfig) {
    throw new Error('Failed to create Action, missing action config')
  }

  const resource = new RestResourceImp(resourceConfig)

  return new RestActionImp(
    resource,
    actionConfig,
    action.runOnInit,
    action.body,
  )
}
