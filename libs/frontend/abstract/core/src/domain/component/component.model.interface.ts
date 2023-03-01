import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { INodeType } from '../../base'
import type { ICacheService } from '../../service'
import type { IAtom } from '../atom'
import type { IElement, IElementTreeService } from '../element'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IAuth0Owner } from '../user'
import type { IComponentDTO } from './component.dto.interface'

export interface IComponent
  extends INodeType<'Component'>,
    IElementTreeService,
    ICacheService<IComponentDTO, IComponent> {
  id: string
  name: string
  rootElement: Ref<IElement>
  childrenContainerElement: Ref<IElement>
  owner: IAuth0Owner
  api: Ref<IInterfaceType>
  props?: Nullable<IProp>
  instanceElement: Nullable<Ref<IElement>>
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponent?: Nullable<IEntity>
  setSourceComponent: (entity: IEntity) => void
  setInstanceElement: (elementRef: Ref<IElement>) => void
  setChildrenContainerElement: (element: Ref<IElement>) => void
  setProps(t: Nullable<IProp>): void
  clone(instanceId: string): IComponent
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}

export const isComponentModel = (
  component: Ref<IAtom> | Ref<IComponent> | null,
): component is Ref<IComponent> => {
  return component?.$modelType === '@codelab/Component'
}
