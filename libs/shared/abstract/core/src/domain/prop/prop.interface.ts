import { IElement } from '../element/element.interface'

export interface IProp {
  id: string
  data: IPropData
}

export interface IPropData {
  [key: string]: any
}

export type IPropDataByElementId = { [id: IElement['id']]: IPropData }
