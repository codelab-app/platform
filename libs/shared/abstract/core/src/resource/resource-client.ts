import type { IResourceFetchConfig } from './resource-fetch-config'

export interface IResourceClient {
  fetch(config: Partial<IResourceFetchConfig>): Promise<unknown>
}
