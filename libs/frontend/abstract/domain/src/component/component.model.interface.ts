import type {
  ComponentCreateInput,
  ComponentUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IComponent,
  IComponentDTO,
  IComponentSerialized,
  IElementRenderTypeKind,
  IRef,
} from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElementModel, IElementTree } from '../element'
import type { IPropModel } from '../prop'
import type { ICacheService, IModel } from '../shared'
import type { IStoreModel } from '../store'
import type { IInterfaceTypeModel } from '../type'

export interface IComponentModel
  extends ICacheService<IComponentDTO, IComponentModel>,
    IElementTree,
    Omit<IComponentDTO, 'props' | 'rootElement'>,
    IModel<ComponentCreateInput, ComponentUpdateInput, void, IComponent> {
  __typename: IElementRenderTypeKind.Component
  api: Ref<IInterfaceTypeModel>
  childrenContainerElement: Ref<IElementModel>
  descendantComponents: Array<IComponentModel>
  instanceElement: Nullable<Ref<IElementModel>>
  props: IPropModel
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IRef>
  store: Ref<IStoreModel>
  toJson: IComponentSerialized

  setChildrenContainerElement(element: Ref<IElementModel>): void
  setInstanceElement(elementRef: Ref<IElementModel>): void
  setProps(props: IPropModel): void
  setSourceComponent(entity: IRef): void
  setStore(props: Nullable<Ref<IStoreModel>>): void
  toCreateInput(): ComponentCreateInput
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
