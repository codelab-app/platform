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
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<Ref<IComponent>>
  activeElementTree: Maybe<IElementTree>
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTab: RendererTab
  builderContainerWidth: number
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>
  /**
   * The difference between current and selected builderWidth is that
   * - currentBuilderWidth is changed by useBuilderResize
   * - selectedBuilderWidth is changed by PageDetailHeader and
   * is being listened to by useBuilderResize
   */
  currentBuilderWidth: BuilderWidth
  currentDragData: Nullable<Frozen<BuilderDragData>>
  expandedComponentTreeNodeIds: Array<string>
  expandedPageElementTreeNodeIds: Array<string>
  hoveredNode: Nullable<IPageNodeRef>
  selectedBuilderWidth: BuilderWidth
  selectedNode: Nullable<IPageNodeRef>

  selectComponentNode(node: Nullable<IComponent>): void
  selectElementNode(node: Nullable<IElement>): void
  setActiveTab(tab: RendererTab): void
  setBuilderContainerWidth(width: number): void
  setCurrentBuilderWidth(width: Nullable<BuilderWidth>): void
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(element: Nullable<IPageNodeRef>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedNode(node: Nullable<IPageNodeRef>): void
}
