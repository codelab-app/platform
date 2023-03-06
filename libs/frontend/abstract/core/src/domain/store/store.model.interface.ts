import type { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAction } from '../action'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IStoreDTO } from './store.dto.interface'

export interface IStore extends ICacheService<IStoreDTO, IStore> {
  id: string
  name: string
  api: Ref<IInterfaceType>
  actions: Array<Ref<IAction>>
  state: IProp
  toCreateInput(): StoreCreateInput
}

export type IStoreRef = string
