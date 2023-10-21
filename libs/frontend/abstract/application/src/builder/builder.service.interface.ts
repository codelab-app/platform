import type {
  BuilderDragData,
  BuilderWidth,
  BuilderWidthBreakPoint,
  IAtomModel,
  IComponentModel,
  IElementModel,
  IElementTree,
  IPageNodeRef,
  RendererTab,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Frozen, Ref } from 'mobx-keystone'

// TBC: | IComponent
export type IBuilderComponent = IAtomModel & {
  // tag: Ref<ITag>
}

export enum DragOverlayPosition {
  Left = 'Left',
  Top = 'Top',
  Bottom = 'Bottom',
  Right = 'Right',
  Inside = 'Inside',
  NotAllowed = 'Not Allowed',
}

export interface IDragOverlayData {
  elementId: string
  position: DragOverlayPosition
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
  currentDragData: Nullable<Frozen<BuilderDragData>>
  dragOverlayData: Nullable<IDragOverlayData>
  expandedComponentTreeNodeIds: Array<string>
  expandedPageElementTreeNodeIds: Array<string>
  hoveredNode: Nullable<IPageNodeRef>
  selectedBuilderBreakpoint: BuilderWidthBreakPoint
  selectedBuilderWidth: BuilderWidth
  selectedNode: Nullable<IPageNodeRef>

  dragOverElementNode(id: string, position: DragOverlayPosition): void
  hoverElementNode(node: Nullable<IElementModel>): void
  selectComponentNode(node: Nullable<IComponentModel>): void
  selectElementNode(node: Nullable<IElementModel>): void
  setActiveTab(tab: RendererTab): void
  setBuilderContainerWidth(width: number): void
  setCurrentDragData(data: Nullable<Frozen<BuilderDragData>>): void
  setDragDropData(data: IDragOverlayData): void
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(element: Nullable<IPageNodeRef>): void
  setSelectedBuilderBreakpoint(width: Nullable<BuilderWidthBreakPoint>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedNode(node: Nullable<IPageNodeRef>): void
}
