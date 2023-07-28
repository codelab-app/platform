import type { IEntity } from '@codelab/shared/abstract/types'
import type { IResourceType } from './resource-type.enum'
import type { IAuth0Owner } from './user.interface'

export interface IResourceDTO extends IAuth0Owner {
  // ref to prop of IResourceConfigData
  config: IEntity
  id: string
  name: string
  type: IResourceType
}
