import { ResourceType } from './resource-type.enum'

export interface AbstractResource<T extends ResourceType, C> {
  id: string
  name: string
  type: T
  config: C
}
