import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement } from '../element'
import type { IInterfaceType } from '../type'
import type { IPropDTO } from './prop.dto.interface'

export interface IProp extends ICacheService<IPropDTO, IProp> {
  id: string
  data: Frozen<Nullable<IPropData>>
  api?: Nullable<Ref<IInterfaceType>>
  jsonString: string
  values: IPropData

  toCreateInput(): PropCreateInput
  toUpdateInput(): PropUpdateInput
  set(key: string, value: object | string): void
  setSilently(key: string, value: object): void
  setMany(data: IPropData): void
  delete(key: string): void
  get(key: string): unknown
  clone(): IProp

  toCreateInput(): PropCreateInput
  toUpdateInput(): PropUpdateInput
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IPropData = Record<string, any>

export interface IPropDataByElementId {
  [id: IElement['id']]: IPropData
}

export interface IPropsFieldContext {
  autocomplete?: IPropData
}
