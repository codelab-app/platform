import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface ICreateTagData extends IOwnerSchema {
  id: string
  name: string
  parent?: IEntity
}

export type IUpdateTagData = Omit<ICreateTagData, 'owner'>

export interface ITagDTO extends IOwnerSchema {
  id: string
  isRoot?: boolean | null
  name: string
  parent?: Nullable<IEntity>
  children: Array<IEntity>
  descendants: Array<IEntity>
}
