import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import type { ResourceFragment } from './resource.fragment.graphql.gen'
import type { IRestResourceConfig } from './rest-resource-config.interface'

export interface ICreateResourceDTO {
  name: string
  type: IResourceType
  config: IGraphQLResourceConfig | IRestResourceConfig
  auth0Id: string
}

export type IUpdateResourceDTO = ICreateResourceDTO
export type IResourceDTO = ResourceFragment
