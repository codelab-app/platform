import { AbstractResource } from '../abstract-resource.interface'
import { ResourceType } from '../resource-type.enum'

export interface IGraphQLResourceConfig {
  url: string
  headers: string
  cookies: string
}

export type IGraphQLResource = AbstractResource<
  ResourceType.GraphQL,
  IGraphQLResourceConfig
>
