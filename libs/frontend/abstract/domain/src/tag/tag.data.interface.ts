import type { IRef } from '@codelab/shared/abstract/core'

export interface ICreateTagData {
  id: string
  name: string
  parent?: IRef
}

export type IUpdateTagData = ICreateTagData
