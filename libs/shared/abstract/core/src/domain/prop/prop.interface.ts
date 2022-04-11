import { IElement } from '../element/element.interface'

export interface IProp {
  id: string
  data: string
}

export interface IPropData {
  [key: string]: any
}

export type IPropDataByElementId = { [id: IElement['id']]: IPropData }
