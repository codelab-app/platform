import type {
  BuilderDndType,
  BuilderWidth,
  BuilderWidthBreakPoint,
  DragPosition,
  IAtomModel,
  IComponentModel,
  IElementModel,
  IElementTree,
  IPageNodeRef,
  RendererTab,
} from '@codelab/frontend/abstract/domain'
import { IElementDTO } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

// TBC: | IComponent
export type IBuilderComponent = IAtomModel & {
  // tag: Ref<ITag>
}

export type DragDropData = {
  source: Nullable<Ref<IElementModel>>
  target: Nullable<Ref<IElementModel>>
  dragPosition: Nullable<DragPosition>
  actionType: Nullable<BuilderDndType>
}

export interface IBuilderService {
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<Ref<IComponentModel>>
  activeElementTree: Maybe<IElementTree>
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTab: RendererTab
  builderContainerWidth: number
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>
  dragDropData: Nullable<DragDropData>
  expandedComponentTreeNodeIds: Array<string>
  expandedPageElementTreeNodeIds: Array<string>
  selectedBuilderBreakpoint: BuilderWidthBreakPoint
  selectedBuilderWidth: BuilderWidth
  selectedNode: Nullable<IPageNodeRef>
  hoveredNode: Nullable<IPageNodeRef>

  hoverElementNode(node: Nullable<IElementModel>): void
  selectComponentNode(node: Nullable<IComponentModel>): void
  selectElementNode(node: Nullable<IElementModel>): void
  setActiveTab(tab: RendererTab): void
  setBuilderContainerWidth(width: number): void
  setDragDropData(data: Partial<DragDropData>): void
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(element: Nullable<IPageNodeRef>): void
  setSelectedBuilderBreakpoint(width: Nullable<BuilderWidthBreakPoint>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedNode(node: Nullable<IPageNodeRef>): void
}
