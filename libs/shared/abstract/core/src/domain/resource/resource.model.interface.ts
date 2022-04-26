import { Ref } from 'mobx-keystone'
import { IGraphQLResourceConfig } from './graphql-resource'
import { IOperation } from './operation.model.interface'
import { ResourceType } from './resource-type.enum'
import { IRestResourceConfig } from './rest-resource'

export interface IResource {
  id: string
  name: string
  config: IGraphQLResourceConfig | IRestResourceConfig
  type: ResourceType
  operations: Array<Ref<IOperation>>
}

export type IResourceRef = string
