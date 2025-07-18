import type { IStoreDto } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import type { IActionModel } from '../action'
import type { IActionNodeData } from '../action/action.node.interface'
import type { IComponentModel } from '../component'
import type { IPageModel } from '../page'
import type { ITreeNode } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { IInterfaceTypeModel } from '../type'

export interface IStoreModel extends IModel<IStoreDto, IStoreModel> {
  actions: Array<IActionModel>
  actionsTree: Array<ITreeNode<IActionNodeData>>
  api: Ref<IInterfaceTypeModel>
  component: Nullable<Ref<IComponentModel>>
  id: string
  name: string
  page: Nullable<Ref<IPageModel>>
  setComponent(componentRef: Ref<IComponentModel>): void
}
