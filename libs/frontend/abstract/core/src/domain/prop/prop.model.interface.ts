import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElementModel } from '../element'
import type { IModel } from '../model.interface'
import type { IInterfaceType } from '../type'

export interface IPropModel
  extends IModel<PropCreateInput, PropUpdateInput, void>,
    ICacheService<IPropDTO, IPropModel> {
  api?: Nullable<Ref<IInterfaceType>>
  data: Frozen<Nullable<IPropData>>
  id: string
  jsonString: string
  toJson: IPropDTO
  values: IPropData

  clone(): IPropModel
  delete(key: string): void
  get(key: string): unknown
  set(key: string, value: boolean | object | string): void
  setMany(data: IPropData): void
  setSilently(key: string, value: object): void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IPropData = Record<string, any>

export interface IPropDataByElementId {
  [id: IElementModel['id']]: IPropData
}
