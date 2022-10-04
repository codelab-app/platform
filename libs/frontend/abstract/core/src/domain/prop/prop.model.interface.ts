import { Frozen } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IElement } from '../element'
import { IPropDTO } from './prop.dto.interface'

export interface IProp<T = IPropData> extends ICacheService<IPropDTO, IProp> {
  id: string
  data: Frozen<T>
  jsonString: string
  values: T

  set(key: string, value: object): void
  delete(key: string): void
  get(key: string): object
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
