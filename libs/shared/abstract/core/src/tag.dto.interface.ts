import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { IOwner } from './user.interface'

export interface ITagDTO extends IOwner {
  children: Array<IEntity>
  // This is computed property
  descendants?: Array<IEntity>
  id: string
  isRoot?: boolean | null
  name: string
  parent?: Nullable<IEntity>
}
