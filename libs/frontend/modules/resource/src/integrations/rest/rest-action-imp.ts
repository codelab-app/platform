import { IPropData, IRestActionConfig } from '@codelab/shared/abstract/core'
import { Method } from 'axios'
import { ActionBaseImp } from '../base-action-imp'
import { RestResourceImp } from './rest-resource-imp'

export class RestActionImp extends ActionBaseImp<
  RestResourceImp,
  IRestActionConfig,
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
