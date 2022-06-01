import { IRestResourceConfig } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import axios, { AxiosInstance } from 'axios'
import { BaseResourceImp } from '../base-resource-imp'

export class RestResourceImp extends BaseResourceImp<
  AxiosInstance,
  IRestResourceConfig
> {
  private _client: Nullish<AxiosInstance> = null

  getInstance(): AxiosInstance {
    if (!this._client) {
      this._client = axios.create({
        baseURL: this._config.url,
        headers: JSON.parse(this._config.headers || '{}'),
      })
    }

    return this._client
  }
}
