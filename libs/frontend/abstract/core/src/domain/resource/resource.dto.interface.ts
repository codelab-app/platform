import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IAuth0Owner } from '../user'
import type { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import type { ResourceFragment } from './resource.fragment.graphql.gen'
import type { IRestResourceConfig } from './rest-resource-config.interface'

export interface ICreateResourceDTO {
  id: string
  name: string
  type: IResourceType
  config: IGraphQLResourceConfig | IRestResourceConfig
  owner: IAuth0Owner
}

export type IUpdateResourceDTO = ICreateResourceDTO

export type IResourceDTO = ResourceFragment
