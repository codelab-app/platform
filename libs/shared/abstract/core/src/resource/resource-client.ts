import type { AxiosResponse } from 'axios'
import type { GraphQLResponse } from 'graphql-request/build/esm/types'
import type { IResourceFetchConfig } from './resource-fetch-config'

export interface IResourceClient {
  fetch(
    config: Partial<IResourceFetchConfig>,
  ): Promise<AxiosResponse> | Promise<GraphQLResponse>
}
