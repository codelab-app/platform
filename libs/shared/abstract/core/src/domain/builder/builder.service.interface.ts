import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Frozen, Ref } from 'mobx-keystone'
import { IModalService } from '../../service'
import { IBuilderDataNode } from '../../ui'
import { IComponent } from '../component'
import { IElement } from '../element'
import { IStateTreeNode, RendererTab } from '../render'
import { BuilderDragData } from './builder.interface'
import { BuilderTab } from './builder-tab.interface'

export interface StateModalProperties {
  node: Nullable<IStateTreeNode>
}

export interface IBuilderService {
  builderTab: BuilderTab
  _selectedElement: Nullable<Ref<IElement>>
  activeTree: RendererTab
  selectedElement: Maybe<IElement>
  hoveredElement: Nullable<Ref<IElement>>
  selectedComponentRef: Nullable<Ref<IComponent>>
  setSelectedComponentRef(component: Ref<IComponent>): void

  setSelectedTreeNode(node: IBuilderDataNode | null): void
  setHoveredElement(element: Nullable<Ref<IElement>>): void
  currentDragData: Nullable<Frozen<BuilderDragData>>
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
  setBuilderTab(data: BuilderTab): void
  stateModal: IModalService<IStateTreeNode>
  setActiveTree(tab: RendererTab): void
}
