import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'
import type { IAtom } from '../atom'
import type { IComponent } from '../component'
import type { IElement, IElementTree } from '../element'
import type { IPageNodeRef } from '../page'
import type { RendererTab } from '../render'
import type { BuilderDragData, BuilderWidth } from './builder.interface'
// TBC: | IComponent
export type IBuilderComponent = IAtom & {
  // tag: Ref<ITag>
}
export interface IBuilderService {
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTree: RendererTab

  selectedNode: Nullable<IPageNodeRef>
  hoveredNode: Nullable<IPageNodeRef>
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
  expandedComponentTreeNodeIds: Array<string>
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<Ref<IComponent>>
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  selectComponentNode(node: Nullable<IComponent>): void
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  selectElementNode(node: Nullable<IElement>): void
  setHoveredNode(element: Nullable<IPageNodeRef>): void
  setSelectedNode(node: Nullable<IPageNodeRef>): void
  setCurrentBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setBuilderContainerWidth(width: number): void
  setActiveTree(tab: RendererTab): void
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
}
