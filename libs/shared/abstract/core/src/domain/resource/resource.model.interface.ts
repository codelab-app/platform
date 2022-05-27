import { Ref } from 'mobx-keystone'
import { IOperation } from '../operation'
import { IProp } from '../prop'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

export enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export type IResourceOperation = IProp<
  IGraphQLResourceConfig | IRestResourceConfig
>

export interface IResource {
  id: string
  name: string
  config: IResourceOperation
  type: ResourceType
  operations: Array<Ref<IOperation>>
  toMobxObservable(globals?: any): any
}

export type IResourceRef = string
