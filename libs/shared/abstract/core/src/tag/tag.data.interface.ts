import type { IRef } from '../model/node-type.interface'

export interface ICreateTagData {
  id: string
  name: string
  parent?: IRef | null
}

export type IUpdateTagData = ICreateTagData
