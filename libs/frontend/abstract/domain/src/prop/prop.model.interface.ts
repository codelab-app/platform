import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IProp, IPropData, IPropDto } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { IElementModel } from '../element'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { IInterfaceTypeModel } from '../type'

export interface IPropModel
  extends IModel<PropCreateInput, PropUpdateInput, void, IProp>,
    ICacheService<IPropDto, IPropModel> {
  api?: Nullable<Ref<IInterfaceTypeModel>>
  data: Frozen<Nullable<IPropData>>
  jsonString: string
  values: IPropData

  clone(): IPropModel
  delete(key: string): void
  get(key: string): unknown
  set(key: string, value: boolean | object | string): void
  setMany(data: IPropData): void
}

export interface IPropDataByElementId {
  [id: IElementModel['id']]: IPropData
}
