import type { IProp, IPropData, IPropDto } from '@codelab/shared/abstract/core'
import type { Nullable, ObjectLike } from '@codelab/shared/abstract/types'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Frozen, Ref } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials/dist/types'

import type { IElementModel } from '../element'
import type { IModel } from '../shared/models/model.interface'
import type { IInterfaceTypeModel } from '../type'

export interface IPropModel extends IModel<IPropDto, IPropModel> {
  api?: Nullable<Ref<IInterfaceTypeModel>>
  data: Frozen<Nullable<IPropData>>
  id: string
  jsonString: string
  values: IPropData
  clone(): IPropModel
  delete(key: string): void
  get(key: string): unknown
  set(key: string, value: ArrayOrSingle<boolean | string | ObjectLike>): void
  setMany(data: IPropData): void
}

export interface IPropDataByElementId {
  [id: IElementModel['id']]: IPropData
}
