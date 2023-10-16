import type {
  IGraphQLFetchConfig,
  IRestFetchConfig,
} from './resource-fetch-config'

interface IBaseResourceClient<IActionConfig> {
  fetch(config: IActionConfig): Promise<unknown>
}

export type IResourceGraphqlClient = IBaseResourceClient<IGraphQLFetchConfig>

export type IResourceRestClient = IBaseResourceClient<IRestFetchConfig>

export type IResourceClient = IResourceGraphqlClient | IResourceRestClient
