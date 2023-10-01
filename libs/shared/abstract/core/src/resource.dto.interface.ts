import type { IEntity } from '@codelab/shared/abstract/types'
import type { IPropDTO } from './prop.dto.interface'
import type { IResourceType } from './resource-type.enum'

export interface IResourceDTO {
  // ref to prop of IResourceConfigData
  config: IPropDTO
  id: string
  name: string
  type: IResourceType
}
