import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAtomModel } from '../atom'
import type { IComponentModel } from '../component'
import type { IElementModel, IElementTree } from '../element'
import type { IPageNodeRef } from '../page'
import type {
  BuilderWidth,
  BuilderWidthBreakPoint,
  RendererTab,
} from './builder.interface'

export type IBuilderComponent = IAtomModel

export interface IBuilderDomainService {
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
  expandedComponentTreeNodeIds: Array<string>
  expandedPageElementTreeNodeIds: Array<string>
  hoveredNode: Nullable<IPageNodeRef>
  selectedBuilderBreakpoint: BuilderWidthBreakPoint
  selectedBuilderWidth: BuilderWidth
  selectedNode: Nullable<IPageNodeRef>

  hoverElementNode(node: Nullable<IElementModel>): void
  selectComponentNode(node: Nullable<IComponentModel>): void
  selectElementNode(node: Nullable<IElementModel>): void
  setActiveTab(tab: RendererTab): void
  setBuilderContainerWidth(width: number): void
  setExpandedComponentTreeNodeIds(expandedNodeIds: Array<string>): void
  setExpandedPageElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(element: Nullable<IPageNodeRef>): void
  setSelectedBuilderBreakpoint(width: Nullable<BuilderWidthBreakPoint>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedNode(node: Nullable<IPageNodeRef>): void
}
