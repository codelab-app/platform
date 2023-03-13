import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAction } from '../action'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  actions: Array<Ref<IAction>>
  api: Ref<IInterfaceType>
  id: string
  name: string
  state: IProp
  toCreateInput(): StoreCreateInput
  toDeleteInput(): StoreDeleteInput
  toUpdateInput(): StoreUpdateInput
}

export type IStoreRef = string
