import type { IProp, IPropDto } from '../prop/prop.dto.interface'
import type { IResourceType } from './resource-type.enum'

export interface IResourceDTO {
  config: IPropDto
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
