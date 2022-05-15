import { IElement } from '../element'

export interface IProp {
  id: string
  data: IPropData
  jsonString: string
  values: IPropData
}

export interface IPropData {
  [key: string]: any
}

export type IPropDataByElementId = { [id: IElement['id']]: IPropData }

export interface IPropsFieldContext {
  autocomplete?: IPropData
}
