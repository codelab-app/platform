import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IActionsTreeDataNode } from '../../ui'
import type { IAction } from '../action'
import type { IComponentModel } from '../component'
import type { IModel } from '../model.interface'
import type { IPageModel } from '../page'
import type { IPropData } from '../prop'
import type { IInterfaceType } from '../type'

export interface IStore
  extends IModel<StoreCreateInput, StoreUpdateInput, StoreDeleteInput>,
    ICacheService<IStoreDTO, IStore> {
  actionRunners: Record<string, (...args: Array<unknown>) => void>
  actions: Array<Ref<IAction>>
  actionsTree: Array<IActionsTreeDataNode>
  api: Ref<IInterfaceType>
  component: Nullable<Ref<IComponentModel>>
  id: string
  jsonString: string
  name: string
  page: Nullable<Ref<IPageModel>>
  refs: IPropData
  source: Nullable<IEntity>
  state: IPropData

  clone(componentId: string): IStore
  registerRef(key: string, node: HTMLElement): void
  setComponent(componentRef: Ref<IComponentModel>): void
}

export type IStoreRef = string
