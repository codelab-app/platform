import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type {
  IRuntimeModel,
  IRuntimeModelRef,
} from '../runtime.model.interface'
import type { IRuntimeElementModel, IRuntimeProp } from '../runtime-element'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeContainerNodeModel extends AnyModel, IRuntimeProp {
  containerNode: IComponentModel | IPageModel
  containerNodeRef: Ref<IComponentModel> | Ref<IPageModel>
  id: string

  parent?: IRuntimeModel
  parentRef?: IRuntimeModelRef

  runtimeElements: ObjectMap<IRuntimeElementModel>
  runtimeStore: IRuntimeStoreModel

  addRuntimeElement(element: IElementModel): IRuntimeElementModel
  render(): Nullable<ReactElement>
}
