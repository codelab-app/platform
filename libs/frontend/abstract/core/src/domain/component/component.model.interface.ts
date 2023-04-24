import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IOwner } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTree } from '../element'
import type { IProp } from '../prop'
import type { IStore } from '../store'
import type { IInterfaceType } from '../type'
import type { IComponentDTO } from './component.dto.interface'

export interface IComponent
  extends ICacheService<IComponentDTO, IComponent>,
    IOwner,
    IElementTree {
  api: Ref<IInterfaceType>
  childrenContainerElement: Ref<IElement>
  descendantComponents: Array<IComponent>
  instanceElement: Nullable<Ref<IElement>>
  keyGenerator: Nullable<string>
  name: string
  props: Ref<IProp>
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IEntity>
  store: Ref<IStore>

  clone(key: string, instanceId?: string): IComponent
  setChildrenContainerElement(element: Ref<IElement>): void
  setInstanceElement(elementRef: Ref<IElement>): void
  setProps(props: Nullable<Ref<IProp>>): void
  setSourceComponent(entity: IEntity): void
  setStore(props: Nullable<Ref<IStore>>): void
  toCreateInput(): ComponentCreateInput
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
