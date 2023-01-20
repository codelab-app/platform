import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { INodeType } from '../../base'
import type { ICacheService } from '../../service'
import type { IElementTreeService } from '../element'
import type { IProp } from '../prop'
import type { IAnyType } from '../type'
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
  api: Ref<IAnyType>
  props?: Nullable<IProp>
}

export type IComponentRef = string

export const isComponentDTO = (
  component: Nullish<IComponentDTO>,
): component is IComponentDTO => {
  return component !== undefined && component !== null
}
