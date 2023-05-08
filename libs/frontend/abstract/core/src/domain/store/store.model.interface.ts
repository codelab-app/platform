import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAction } from '../action'
import type { IModel } from '../model.interface'
import type { IPropData } from '../prop'
import type { IInterfaceType } from '../type'

export interface IStore
  extends IModel<StoreCreateInput, StoreUpdateInput, StoreDeleteInput>,
    ICacheService<IStoreDTO, IStore> {
  actions: Array<Ref<IAction>>
  api: Ref<IInterfaceType>
  id: string
  jsonString: string
  name: string
  state: IPropData
}

export type IStoreRef = string
