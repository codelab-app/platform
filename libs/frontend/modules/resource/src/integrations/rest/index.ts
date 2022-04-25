import {
  IRestOperationConfig,
  IRestResourceConfig,
} from '@codelab/shared/abstract/core'
import { RestOperation } from './rest-operation'
import { RestResource } from './rest-resource'

export const createRestOperation = (
  resourceConfig: IRestResourceConfig,
  operationConfig: IRestOperationConfig,
  runOnInit: boolean,
) => {
  const resource = new RestResource(resourceConfig)

  return new RestOperation(resource, operationConfig, runOnInit)
}
