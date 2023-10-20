import type { IEntity } from '@codelab/shared/abstract/types'

export interface ICreateTagData {
  id: string
  name: string
  parent?: IEntity
}

export type IUpdateTagData = ICreateTagData
