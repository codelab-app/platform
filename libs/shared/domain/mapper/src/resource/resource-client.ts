import type {
  IGraphQLFetchConfigData,
  IResourceClient,
  IResourceConfigData,
  IRestFetchConfigData,
} from '@codelab/shared/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { tryParse } from '@codelab/shared/utils'
import type { Axios } from 'axios'
import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
import isString from 'lodash/isString'
import merge from 'lodash/merge'

class ResourceGraphQlClient implements IResourceClient {
  constructor(resourceConfig: IResourceConfigData) {
    const { headers, url } = resourceConfig
    const options = { headers: tryParse(headers) }

    this.client = new GraphQLClient(url, options)
  }

  private client: GraphQLClient

  fetch(config: IGraphQLFetchConfigData): Promise<unknown> {
    const headers = merge(tryParse(config.headers))
    const variables = merge(tryParse(config.variables))

    return this.client.request(config.query, variables, headers)
  }
}

class ResourceRestClient implements IResourceClient {
  constructor(resourceConfig: IResourceConfigData) {
    const { headers, url } = resourceConfig

    this.client = axios.create({ baseURL: url, headers: tryParse(headers) })
  }

  private client: Axios

  fetch(config: IRestFetchConfigData) {
    const data = merge(tryParse(config.body))
    const headers = merge(tryParse(config.headers))
    const parsedParams = tryParse(config.queryParams)

    return this.client.request({
      data,
      headers,
      method: config.method,
      // params should be an object to be properly used as url params
      params: isString(parsedParams) ? undefined : parsedParams,
      responseType: config.responseType,
      url: config.urlSegment,
    })
  }
}

export const getResourceClient = (
  type: IResourceType,
  config: IResourceConfigData,
): IResourceClient =>
  type === IResourceType.GraphQl
    ? new ResourceGraphQlClient(config)
    : new ResourceRestClient(config)
