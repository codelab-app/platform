import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeModelRef,
} from '../renderer'
import type {
  BuilderWidth,
  BuilderWidthBreakPoint,
  RendererTab,
} from './builder.interface'

export type IBuilderComponent = IAtomModel

export interface IBuilderService {
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<Ref<IRuntimeComponentModel>>
  /**
   * Root page or a component id
   */
  activeContainerId?: Nullable<string>
  /**
   * Tells us which tree we are selecting in the main pane
   */
  activeTab: RendererTab
  builderContainerWidth: number
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>
  expandedElementTreeNodeIds: Array<string>
  hoveredNode: Nullable<IRuntimeModelRef>
  selectedBuilderBreakpoint: BuilderWidthBreakPoint
  selectedBuilderWidth: BuilderWidth
  selectedNode: Nullable<IRuntimeModelRef>

  hoverElementNode(node: Nullable<IRuntimeElementModel>): void
  selectComponentNode(node: Nullish<IRuntimeComponentModel>): void
  selectElementNode(node: Nullish<IRuntimeElementModel>): void
  selectPerviousElementOnDelete(): void
  setActiveTab(tab: RendererTab): void
  setBuilderContainerWidth(width: number): void
  setExpandedElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(element: Nullable<IRuntimeModelRef>): void
  setSelectedBuilderBreakpoint(width: Nullable<BuilderWidthBreakPoint>): void
  setSelectedBuilderWidth(width: Nullable<BuilderWidth>): void
  setSelectedNode(node: Nullable<IRuntimeModelRef>): void
}
