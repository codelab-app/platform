import {
  IRestActionConfig,
  IRestResourceConfig,
} from '@codelab/shared/abstract/core'
import { RestActionImp } from './rest-action-imp'
import { RestResourceImp } from './rest-resource-imp'

export const createRestAction = (
  resourceConfig: IRestResourceConfig,
  operationConfig: IRestActionConfig,
  runOnInit: boolean,
) => {
  const resource = new RestResourceImp(resourceConfig)

  return new RestActionImp(resource, operationConfig, runOnInit)
}
