import { IProp } from '../prop'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

export enum ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export type IResourceConfig = IProp<
  IGraphQLResourceConfig | IRestResourceConfig
>

export interface IResource {
  id: string
  name: string
  config: IResourceConfig
  type: ResourceType
}

export type IResourceRef = string
