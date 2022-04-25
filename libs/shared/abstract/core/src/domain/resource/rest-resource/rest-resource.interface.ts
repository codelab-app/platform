import { AbstractResource } from '../abstract-resource.interface'
import { ResourceType } from '../resource-type.enum'

export interface IRestResourceConfig {
  cookies: string
  headers: string
  url: string
}

export type IRestResource = AbstractResource<
  ResourceType.Rest,
  IRestResourceConfig
>
