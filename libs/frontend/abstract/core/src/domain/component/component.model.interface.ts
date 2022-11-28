import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { INodeType } from '../../base'
import { ICacheService } from '../../service'
import { IElementTreeService } from '../element'
import { IProp } from '../prop'
import { IAnyType } from '../type'
import { IComponentDTO } from './component.dto.interface'

export interface IComponent
  extends INodeType<'Component'>,
    IElementTreeService,
    ICacheService<IComponentDTO, IComponent> {
  id: string
  name: string
  rootElementId: string
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
