import { IPropData, IRestOperationConfig } from '@codelab/shared/abstract/core'
import { Method } from 'axios'
import { BaseOperation } from '../base-operation'
import { RestResource } from './rest-resource'

export class RestOperation extends BaseOperation<
  RestResource,
  IRestOperationConfig,
  IPropData
> {
  fetch(): Promise<IPropData> {
    return this._resource.getInstance().request({
      method: this._config.method as Method,
      data: this._config.body,
      params: this._config.queryParams,
    })
  }
}
