import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IActionModel } from '../action'
import type { IComponentModel } from '../component'
import type { IPageModel } from '../page'
import type { IActionsTreeDataNode, ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { IInterfaceTypeModel } from '../type'

export interface IStoreModel
  extends IModel<StoreCreateInput, StoreUpdateInput, StoreDeleteInput, IStore>,
    ICacheService<IStoreDTO, IStoreModel> {
  actionRunners: Record<string, (...args: Array<unknown>) => void>
  actions: Array<Ref<IActionModel>>
  actionsTree: Array<IActionsTreeDataNode>
  api: Ref<IInterfaceTypeModel>
  component: Nullable<Ref<IComponentModel>>
  id: string
  jsonString: string
  name: string
  page: Nullable<Ref<IPageModel>>
  refs: IPropData
  source: Nullable<IEntity>
  state: IPropData

  clone(componentId: string): IStoreModel
  registerRef(key: string, node: HTMLElement): void
  setComponent(componentRef: Ref<IComponentModel>): void
}
