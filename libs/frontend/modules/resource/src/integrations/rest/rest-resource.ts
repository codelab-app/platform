import { IRestResourceConfig } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import axios, { AxiosInstance } from 'axios'
import { BaseResource } from '../base-resource'

export class RestResource extends BaseResource<
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
