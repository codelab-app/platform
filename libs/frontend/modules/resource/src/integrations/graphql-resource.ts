import {
  IGraphQLOperationConfig,
  IGraphQLResourceConfig,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import { makeAutoObservable } from 'mobx'
import { _await } from 'mobx-keystone'

export class GraphQlOperation<D = any> {
  data: Nullish<D>

  error: any

  isLoading: boolean

  constructor(
    protected _resource: GraphQLResource,
    protected _config: IGraphQLOperationConfig,
  ) {
    this.data = null
    this.error = null
    this.isLoading = false

    makeAutoObservable(this)

    this.execute()
  }

  fetch(): Promise<D> {
    const { query, variables } = this._config

    return this._resource
      .getClient()
      .request(query, JSON.parse(variables || '{}'))
  }

  *execute() {
    this.isLoading = true

    try {
      this.data = yield* _await(this.fetch())
    } catch (error) {
      this.error = error
    } finally {
      this.isLoading = false
    }
  }
}

export class GraphQLResource {
  private _client: Nullish<GraphQLClient> = null

  constructor(protected _config: IGraphQLResourceConfig) {}

  getClient() {
    if (!this._client) {
      const { headers, url } = this._config
      const options = { headers: JSON.parse(headers || '{}') }
      this._client = new GraphQLClient(url, options)
    }

    return this._client
  }
}
