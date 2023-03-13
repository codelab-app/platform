import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTreeService } from '../element'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IOwnerSchema } from '../user'
import type { IComponentDTO } from './component.dto.interface'

export interface IComponent
  extends IElementTreeService,
    ICacheService<IComponentDTO, IComponent>,
    IOwnerSchema {
  api: Ref<IInterfaceType>
  childrenContainerElement: Ref<IElement>
  id: string
  instanceElement: Nullable<Ref<IElement>>
  name: string
  props?: Nullable<Ref<IProp>>
  rootElement: Ref<IElement>
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IEntity>

  clone(instanceId: string): IComponent
  setChildrenContainerElement(element: Ref<IElement>): void
  setInstanceElement(elementRef: Ref<IElement>): void
  setProps(props: Nullable<Ref<IProp>>): void
  setSourceComponent(entity: IEntity): void
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
