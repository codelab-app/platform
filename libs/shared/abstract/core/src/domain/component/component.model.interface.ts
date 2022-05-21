import { Ref } from 'mobx-keystone'
import { INodeType } from '../../base/node.interface'
import { IAnyType } from '../type'
import { IComponentDTO } from './component.dto.interface'

export interface IComponent extends INodeType<'Component'> {
  id: string
  name: string
  rootElementId: string
  ownerId: string
  api: Ref<IAnyType>

  updateCache(componentFragment: IComponentDTO): void
}

export type IComponentRef = string
