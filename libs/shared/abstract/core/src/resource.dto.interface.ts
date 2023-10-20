import type { IProp, IPropDTO } from './prop.dto.interface'
import type { IResourceType } from './resource-type.enum'

export interface IResourceDTO {
  config: IPropDTO
  id: string
  name: string
  type: IResourceType
}

export interface IResource {
  config: IProp
  id: string
  name: string
  type: IResourceType
}
