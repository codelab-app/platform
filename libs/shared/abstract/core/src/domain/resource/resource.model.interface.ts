import { Ref } from 'mobx-keystone'
import { IOperation } from '../operation/operation.model.interface'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

export enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export interface IResource {
  id: string
  name: string
  config: IGraphQLResourceConfig | IRestResourceConfig
  type: ResourceType
  operations: Array<Ref<IOperation>>
}

export type IResourceRef = string
