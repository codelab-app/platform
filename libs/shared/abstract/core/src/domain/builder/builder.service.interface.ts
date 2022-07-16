import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Frozen, Ref } from 'mobx-keystone'
import { IModalService } from '../../service'
import { IComponent } from '../component'
import { IElementTree } from '../element'
import { IStateTreeNode, RendererTab } from '../render'
import { BuilderDragData } from './builder.interface'
import { BuilderTab } from './builder-tab.interface'
import { INode } from './node.interface'

export interface StateModalProperties {
  node: Nullable<IStateTreeNode>
}

export interface IBuilderService {
  activeBuilderTab: BuilderTab
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTree: RendererTab

  _selectedNode: Nullable<Ref<INode>>
  _hoveredNode: Nullable<Ref<INode>>
  selectedNode: Nullable<INode>
  hoveredNode: Nullable<INode>
  currentDragData: Nullable<Frozen<BuilderDragData>>
  stateModal: IModalService<IStateTreeNode>
  activeElementTree: Maybe<IElementTree>
  expandedNodeIds: Array<string>
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<IComponent>

  // setSelectedTreeNode(node: IBuilderDataNode | null): void
  set_hoveredNode(element: Nullable<Ref<INode>>): void
  set_selectedNode(node: Nullable<Ref<INode>>): void
  setExpandedNodeIds(expandedNodeIds: Array<string>): void

  setActiveTree(tab: RendererTab): void
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
  setActiveBuilderTab(data: BuilderTab): void
}
