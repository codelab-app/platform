import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { ResourceFragment } from './resource.fragment.graphql.gen'
import { IResourceType } from './resource-type.enum'
import { IRestResourceConfig } from './rest-resource-config.interface'

export interface ICreateResourceDTO {
  name: string
  type: IResourceType
  config: IGraphQLResourceConfig | IRestResourceConfig
  auth0Id: string
}

export type IUpdateResourceDTO = ICreateResourceDTO
export type IResourceDTO = ResourceFragment
