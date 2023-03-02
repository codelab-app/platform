import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IProp, IPropData, IPropDTO } from '../prop'
import type { IAuth0Owner, IOwnerSchema } from '../user'
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

export type IResourceConfigDTO =
  | IGraphQLResourceConfigDTO
  | IRestResourceConfigDTO

export interface ICreateResourceData extends IOwnerSchema {
  id: string
  name: string
  type: IResourceType
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData

export interface IResourceDTO {
  id: string
  name: string
  type: IResourceType
  // ref to prop of IResourceConfigData
  config: IEntity
}
