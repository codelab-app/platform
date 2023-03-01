import type {
  IEntity,
  INullableEntity,
  Nullable,
} from '@codelab/shared/abstract/types'
import type { Required } from 'utility-types'
import type { IAuth0Owner } from '../user'
import type { TagFragment } from './tag.fragment.graphql.gen'

export interface ICreateTagData {
  id: string
  name: string
  parent?: IEntity
  owner: IAuth0Owner
}

export type IUpdateTagData = Omit<ICreateTagData, 'owner'>

export interface ITagDTO {
  id: string
  isRoot?: boolean | null
  name: string
  parent?: Nullable<IEntity>
  children: Array<IEntity>
  descendants: Array<IEntity>
}
