import type {
  IResourceFetchConfig,
  IResourceFetchResponse,
} from './resource-fetch-config'

export interface IResourceClient {
  fetch(config: Partial<IResourceFetchConfig>): Promise<IResourceFetchResponse>
}
