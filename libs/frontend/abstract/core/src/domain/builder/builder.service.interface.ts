import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { IAtom } from '../atom'
import type { IComponent } from '../component'
import type { IElementTree } from '../element'
import type { RendererTab } from '../render'
import type { BuilderDragData, BuilderWidth } from './builder.interface'
import type { INode } from './node.interface'

// TBC: | IComponent
export type IBuilderComponent = IAtom & {
  // tag: Ref<ITag>
}

export interface IBuilderService {
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTree: RendererTab

  _selectedNode: Nullable<Ref<INode>>
  _hoveredNode: Nullable<Ref<INode>>
  selectedNode: Nullable<INode>
  hoveredNode: Nullable<INode>
  /**
   * The difference between current and selected builderWidth is that
   * - currentBuilderWidth is changed by useBuilderResize
   * - selectedBuilderWidth is changed by PageDetailHeader and
   * is being listened to by useBuilderResize
   */
  currentBuilderWidth: BuilderWidth
  selectedBuilderWidth: BuilderWidth
  builderContainerWidth: number
  currentDragData: Nullable<Frozen<BuilderDragData>>
  activeElementTree: Maybe<IElementTree>

  expandedPageElementTreeNodeIds: Array<string>
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  selectComponentTreeNode(node: Nullable<Ref<INode>>): void

  expandedComponentTreeNodeIds: Array<string>
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  selectPageElementTreeNode(node: Nullable<Ref<INode>>): void
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<IComponent>
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>

  // setSelectedTreeNode(node: IBuilderDataNode | null): void
  set_hoveredNode(element: Nullable<Ref<INode>>): void
  set_selectedNode(node: Nullable<Ref<INode>>): void
  setCurrentBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setBuilderContainerWidth(width: number): void

  setActiveTree(tab: RendererTab): void
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
}
