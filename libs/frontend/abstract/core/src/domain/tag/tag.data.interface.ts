import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateTagData extends IAuth0Owner {
  id: string
  name: string
  parent?: IEntity
}

export type IUpdateTagData = Omit<ICreateTagData, 'owner'>
