import type {
  IGraphQLFetchConfigData,
  IResourceClient,
  IResourceConfigData,
  IResourceFetchResponse,
  IRestFetchConfigData,
} from '@codelab/shared/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { tryParse } from '@codelab/shared/utils'
import type { Axios, AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { ClientError, GraphQLClient } from 'graphql-request'
import isString from 'lodash/isString'
import merge from 'lodash/merge'

export class ResourceGraphQlClient implements IResourceClient {
  constructor(resourceConfig: IResourceConfigData) {
    const { headers, url } = resourceConfig
    const options = { headers: tryParse(headers) }

    this.client = new GraphQLClient(url, {
      ...options,
    })
  }

  private client: GraphQLClient

  fetch(config: IGraphQLFetchConfigData): Promise<IResourceFetchResponse> {
    const headers = merge(tryParse(config.headers))
    const variables = merge(tryParse(config.variables))

    return this.client
      .request(config.query, variables, headers)
      .then((data) => ({ data }))
      .catch((error) => {
        if (error instanceof ClientError) {
          return {
            data: error.response.data,
            error: error.response.errors,
            status: error.response.status,
          }
        } else if (error instanceof Error) {
          return { error: error.message }
        }

        return { error }
      })
  }
}

export class ResourceRestClient implements IResourceClient {
  constructor(resourceConfig: IResourceConfigData) {
    const { headers, url } = resourceConfig

    this.client = axios.create({ baseURL: url, headers: tryParse(headers) })
  }

  private client: Axios

  fetch(config: IRestFetchConfigData): Promise<IResourceFetchResponse> {
    const data = merge(tryParse(config.body))
    const headers = merge(tryParse(config.headers))
    const parsedParams = tryParse(config.queryParams)

    return this.client
      .request({
        data,
        headers,
        method: config.method,
        // params should be an object to be properly used as url params
        params: isString(parsedParams) ? undefined : parsedParams,
        responseType: config.responseType,
        url: config.urlSegment,
      })
      .then((response: AxiosResponse) => ({
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      }))
      .catch((error: AxiosError) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return {
            data: error.response.data,
            error: error.message,
            headers: error.response.headers,
            status: error.response.status,
            statusText: error.response.statusText,
          }
        } else if (error.request) {
          // The request was made but no response was received
          return { error: 'No response was received!' }
        }

        // Something happened in setting up the request that triggered an Error
        return { error: error.message }
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
