import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { INodeType } from '../../base'
import type { ICacheService } from '../../service'
import type { IElement, IElementTreeService } from '../element'
import type { IProp } from '../prop'
import type { IInterfaceType } from '../type'
import type { IComponentDTO } from './component.dto.interface'

export interface IComponent
  extends INodeType<'Component'>,
    IElementTreeService,
    ICacheService<IComponentDTO, IComponent> {
  id: string
  name: string
  rootElementId: string
  childrenContainerElementId: string
  ownerId: string
  api: Ref<IInterfaceType>
  props?: Nullable<IProp>
  instanceElement: Nullable<Ref<IElement>>
  /**
   * to render a component we create a duplicate for each instance
   * keeps track of source component in case this is a duplicate
   */
  sourceComponentId?: Nullable<string>
  setSourceComponentId: (id: string) => void
  setInstanceElement: (elementRef: Ref<IElement>) => void
  clone(cloneIndex: number): IComponent
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
