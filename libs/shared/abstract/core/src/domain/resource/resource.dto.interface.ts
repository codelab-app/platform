import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { ResourceFragment } from './resource.fragment.graphql.gen'
import { ResourceType } from './resource.model.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

export type ICreateResourceDTO = {
  name: string
  type: ResourceType
  config: IGraphQLResourceConfig | IRestResourceConfig
}

export type IUpdateResourceDTO = ICreateResourceDTO
export type IResourceDTO = ResourceFragment
