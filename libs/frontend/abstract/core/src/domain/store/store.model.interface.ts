import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAction } from '../action'
import type { IComponent } from '../component'
import type { IModel } from '../model.interface'
import type { IPage } from '../page'
import type { IPropData } from '../prop'
import type { IInterfaceType } from '../type'

export interface IStore
  extends IModel<StoreCreateInput, StoreUpdateInput, StoreDeleteInput>,
    ICacheService<IStoreDTO, IStore> {
  actions: Array<Ref<IAction>>
  api: Ref<IInterfaceType>
  component: Nullable<Ref<IComponent>>
  id: string
  jsonString: string
  name: string
  page: Nullable<Ref<IPage>>
  source: Nullable<IEntity>
  state: IPropData

  clone(componentId: string): IStore
  setComponent(componentRef: Ref<IComponent>): void
  setInitialState(state: IPropData): void
}

export type IStoreRef = string
