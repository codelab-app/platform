import { Ref } from 'mobx-keystone'
import { INodeType } from '../../base'
import { ICacheService } from '../../service'
import { IElementTreeService } from '../element'
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
}

export type IComponentRef = string
