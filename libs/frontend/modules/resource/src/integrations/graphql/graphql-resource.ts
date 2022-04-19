import { Nullish } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import { BaseResource } from '../base-resource'

export class GraphQLResource extends BaseResource<GraphQLClient> {
  private _client: Nullish<GraphQLClient> = null

  getInstance(): GraphQLClient {
    if (!this._client) {
      const { headers, url } = this._config
      const options = { headers: JSON.parse(headers || '{}') }
      this._client = new GraphQLClient(url, options)
    }

    return this._client
  }
}
