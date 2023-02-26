import type { Frozen } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement } from '../element'
import type { IPropDTO } from './prop.dto.interface'

export interface IProp<T = IPropData> {
  id: string
  data: Frozen<T>
  jsonString: string
  values: T

  set(key: string, value: object): void
  setSilently(key: string, value: object): void
  setMany(data: IPropData): void
  delete(key: string): void
  get(key: string): unknown
  clone(): IProp
}

export interface IPropData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface IPropDataByElementId {
  [id: IElement['id']]: IPropData
}

export interface IPropsFieldContext {
  autocomplete?: IPropData
}
