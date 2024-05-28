import type { IRef } from '../model/ref.interface'

export interface ICreateTagData {
  id: string
  name: string
  parent?: IRef | null
}

export type IUpdateTagData = ICreateTagData
