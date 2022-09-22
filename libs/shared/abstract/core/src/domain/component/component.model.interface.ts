import { Ref } from 'mobx-keystone'
import { INodeType } from '../../base/node.interface'
import { ICacheService } from '../../service'
import { IElementTreeService } from '../element'
import { IAnyType } from '../type'
import { IComponentDTO } from './component.dto.interface'
import { RenderedComponentFragment } from './component-render.fragment.graphql.gen'

export interface IComponent
  extends INodeType<'Component'>,
    IElementTreeService,
    ICacheService<IComponentDTO, IComponent> {
  id: string
  name: string
  rootElementId: string
  ownerId: string
  api: Ref<IAnyType>
  loadComponentTree(renderedComponentFragment: RenderedComponentFragment): void
}

export type IComponentRef = string
