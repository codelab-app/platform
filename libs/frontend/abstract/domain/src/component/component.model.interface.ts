import type {
  ComponentCreateInput,
  ComponentUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IComponent,
  IComponentDto,
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
  extends ICacheService<IComponentDto, IComponentModel>,
    IElementTree,
    Omit<IComponentDto, 'props' | 'rootElement'>,
    IModel<ComponentCreateInput, ComponentUpdateInput, void, IComponent> {
  __typename: IElementRenderTypeKind.Component
  api: Ref<IInterfaceTypeModel>
  descendantComponents: Array<IComponentModel>
  instanceElement: Nullable<Ref<IElementModel>>
  props: IPropModel
  slug: string
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IRef>
  store: Ref<IStoreModel>

  setInstanceElement(elementRef: Ref<IElementModel>): void
  setProps(props: IPropModel): void
  setSourceComponent(entity: IRef): void
  setStore(props: Nullable<Ref<IStoreModel>>): void
  toCreateInput(): ComponentCreateInput
}

export type IComponentRef = string

export const isComponentDto = (
  component: Nullish<IComponentDto>,
): component is IComponentDto => {
  return component !== undefined && component !== null
}
