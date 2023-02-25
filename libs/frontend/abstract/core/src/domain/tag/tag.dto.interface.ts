import type { IEntity } from '@codelab/shared/abstract/types'
import type { Required } from 'utility-types'
import type { IAuth0Owner } from '../user'
import type { TagFragment } from './tag.fragment.graphql.gen'

export interface ICreateTagDTO {
  id: string
  name: string
  parentTag?: IEntity
  owner: IAuth0Owner
}

export type IUpdateTagDTO = Omit<ICreateTagDTO, 'owner'>

export type ITagDTO = Required<Partial<TagFragment>, 'id' | 'name'>
