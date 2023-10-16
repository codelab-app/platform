import type {
  IBaseResourceConfigData,
  IGraphQLFetchConfig,
  IResourceGraphqlClient,
  IResourceRestClient,
  IRestFetchConfig,
} from '@codelab/frontend/abstract/domain'
import { tryParse } from '@codelab/frontend/shared/utils'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import isString from 'lodash/isString'
import merge from 'lodash/merge'

export class ResourceGraphQlClient implements IResourceGraphqlClient {
  constructor(resourceConfig: IBaseResourceConfigData) {
    const { headers, url } = resourceConfig
    const options = { headers: tryParse(headers) }

    this.client = new GraphQLClient(url, options)
  }

  private client: GraphQLClient

  fetch(config: IGraphQLFetchConfig): Promise<unknown> {
    const headers = merge(tryParse(config.headers))
    const variables = merge(tryParse(config.variables))

    return this.client.request(config.query, variables, headers)
  }
}

export class ResourceRestClient implements IResourceRestClient {
  constructor(resourceConfig: IBaseResourceConfigData) {
    const { headers, url } = resourceConfig

    this.client = axios.create({ baseURL: url, headers: tryParse(headers) })
  }

  private client: Axios

  fetch(config: IRestFetchConfig) {
    const data = merge(tryParse(config.body))
    const headers = merge(tryParse(config.headers))
    const parsedParams = tryParse(config.queryParams)

    return this.client.request({
      data,
      headers,
      method: config.method as Method,
      // params should be an object to be properly used as url params
      params: isString(parsedParams) ? undefined : parsedParams,
      responseType: config.responseType,
      url: config.urlSegment,
    })
  }
}
