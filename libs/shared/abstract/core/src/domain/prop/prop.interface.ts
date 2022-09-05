import { IAnyAction } from '../action'
import { IBuilderState } from '../builder'
import { IElement } from '../element'
import { IPropDTO } from './prop.dto.interface'

export interface IProp<T = IPropData> {
  id: string
  data: T
  jsonString: string
  values: T

  updateCache(props: IPropDTO): IProp
  set(key: string, value: any): void
  get(key: string): any
}

export interface IPropData {
  [key: string]: any
}

export interface IPropDataByElementId {
  [id: IElement['id']]: IPropData
}

export interface IPropsFieldContext {
  autocomplete?: IPropData
  builderState: IBuilderState

  actionList?: Array<IAnyAction>
}
