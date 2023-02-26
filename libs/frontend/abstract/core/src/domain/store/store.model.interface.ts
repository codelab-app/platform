import type { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAnyAction } from '../action'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<Ref<IAnyAction>>
  state: IProp
  toCreateInput(): StoreCreateInput
}

export type IStoreRef = string
