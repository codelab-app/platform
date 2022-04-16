import { IGraphQLResourceConfig } from './graphql-resource'
import { ResourceFragment } from './resource.fragment.graphql.gen'
import { ResourceType } from './resource-type.enum'
import { IRestResourceConfig } from './rest-resource'

export type ICreateResourceDTO = {
  name: string
  type: ResourceType
  config: IGraphQLResourceConfig | IRestResourceConfig
}

export type IUpdateResourceDTO = ICreateResourceDTO
export type IResourceDTO = ResourceFragment
