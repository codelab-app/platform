import type { IEntity } from '@codelab/shared/abstract/types'
import type { IResourceType } from './resource-type.enum'

export interface IResourceDTO {
  // ref to prop of IResourceConfigData
  config: IEntity
  id: string
  name: string
  type: IResourceType
}
