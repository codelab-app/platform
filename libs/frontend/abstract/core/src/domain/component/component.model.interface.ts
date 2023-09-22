import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElementModel, IElementTree } from '../element'
import type { IPropModel } from '../prop'
import type { IComponentRuntimeProp } from '../render'
import type { IStoreModel } from '../store'
import type { IInterfaceType } from '../type'

export interface IComponentModel
  extends ICacheService<IComponentDTO, IComponentModel>,
    IElementTree {
  api: Ref<IInterfaceType>
  childrenContainerElement: Ref<IElementModel>
  descendantComponents: Array<IComponentModel>
  instanceElement: Nullable<Ref<IElementModel>>
  keyGenerator: Nullish<string>
  name: string
  props: Ref<IPropModel>
  runtimeProp: Maybe<IComponentRuntimeProp>
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IEntity>
  store: Ref<IStoreModel>

  clone(key: string, instanceId?: string): IComponentModel
  setChildrenContainerElement(element: Ref<IElementModel>): void
  setInstanceElement(elementRef: Ref<IElementModel>): void
  setProps(props: Nullable<Ref<IPropModel>>): void
  setSourceComponent(entity: IEntity): void
  setStore(props: Nullable<Ref<IStoreModel>>): void
  toCreateInput(): ComponentCreateInput
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
