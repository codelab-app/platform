import type { IOwner } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateTagData extends IOwner {
  id: string
  name: string
  parent?: IEntity
}

export type IUpdateTagData = Omit<ICreateTagData, 'owner'>
