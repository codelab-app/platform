import type {
  IComponent,
  IComponentDto,
  IElementRenderTypeKind,
  IRef,
} from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type {
  ComponentCreateInput,
  ComponentUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IElementModel, IElementTree } from '../element'
import type { IPropModel } from '../prop'
import type { ICacheService, IModel } from '../shared'
import type { IStoreModel } from '../store'
import type { IInterfaceTypeModel } from '../type'
import type { IUserModel } from '../user'

export interface IComponentModel
  extends ICacheService<IComponentDto, IComponentModel>,
    IElementTree,
    Omit<IComponentDto, 'props' | 'rootElement'>,
    IModel<IComponent> {
  __typename: IElementRenderTypeKind.Component
  api: Ref<IInterfaceTypeModel>
  descendantComponents: Array<IComponentModel>
  instanceElement: Nullable<Ref<IElementModel>>
  owner: Ref<IUserModel>
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
}

export type IComponentRef = string

export const isComponentDto = (
  component: Nullish<IComponentDto>,
): component is IComponentDto => {
  return component !== undefined && component !== null
}
