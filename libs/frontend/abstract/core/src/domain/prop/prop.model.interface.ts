import type { Maybe } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement } from '../element'
import type { IInterfaceType } from '../type'
import type { IPropDTO } from './prop.dto.interface'

export interface IProp<T = IPropData> extends ICacheService<IPropDTO, IProp> {
  id: string
  data: Frozen<T>
  jsonString: string
  apiRef: Maybe<Ref<IInterfaceType>>
  values: T

  set(key: string, value: object): void
  setSilently(key: string, value: object): void
  setMany(data: IPropData): void
  delete(key: string): void
  get(key: string): unknown
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
