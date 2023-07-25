import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { IAuth0Owner } from './user.interface'

export interface ITagDTO extends IAuth0Owner {
  children?: Array<IEntity>
  // This is computed property
  descendants?: Array<IEntity>
  id: string
  isRoot?: boolean | null
  name: string
  parent?: Nullable<IEntity>
}
