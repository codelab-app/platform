import { INodeType } from '../../base/node.interface'
import { IComponentDTO } from './component.dto.interface'

export interface IComponent extends INodeType<'Component'> {
  id: string
  name: string
  rootElementId: string
  ownerId: string

  updateCache(componentFragment: IComponentDTO): void
}

export type IComponentRef = string
