import { IElement } from '../element'
import { IPropDTO } from './prop.dto.interface'

export interface IProp {
  id: string
  data: IPropData
  jsonString: string
  values: IPropData

  updateCache(props: IPropDTO): IProp
  set(key: string, value: any): void
  get(key: string): any
}

export interface IPropData {
  [key: string]: any
}

export type IPropDataByElementId = { [id: IElement['id']]: IPropData }

export interface IPropsFieldContext {
  autocomplete?: IPropData
}
