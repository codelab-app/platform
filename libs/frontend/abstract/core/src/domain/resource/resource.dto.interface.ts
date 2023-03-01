import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IPropData, IPropDTO } from '../prop'
import type { IAuth0Owner } from '../user'
import type {
  IGraphQLResourceConfigData,
  IGraphQLResourceConfigDTO,
} from './graphql-resource-config.interface'
import type { ResourceFragment } from './resource.fragment.graphql.gen'
import type { IResourceConfig } from './resource.model.interface'
import type { IRestResourceConfigDTO } from './rest-resource-config.interface'

export interface IBaseResourceConfigData {
  url: string
  headers: string
}

export interface ICreateResourceData {
  id: string
  name: string
  type: IResourceType
  config: IBaseResourceConfigData
  owner: IAuth0Owner
}

export interface ICreateResourceDTO {
  id: string
  name: string
  type: IResourceType
  config: IGraphQLResourceConfigDTO | IRestResourceConfigDTO
  owner: IAuth0Owner
}

export type IUpdateResourceData = ICreateResourceData

export interface IResourceDTO {
  id: string
  name: string
  config: IBaseResourceConfigData
  type: IResourceType
}
