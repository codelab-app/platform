import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAction } from '../action'
import type { IModel } from '../model.interface'
import type { IPropData } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore
  extends IModel<StoreCreateInput, StoreUpdateInput, StoreDeleteInput>,
    ICacheService<IStoreDTO, IStore> {
  actions: Array<Ref<IAction>>
  api: Ref<IInterfaceType>
  id: string
  jsonString: string
  name: string
  state: IPropData
  clone(): IStore

  toCreateInput(): StoreCreateInput
  toDeleteInput(): StoreDeleteInput
  toUpdateInput(): StoreUpdateInput
}

export type IStoreRef = string
