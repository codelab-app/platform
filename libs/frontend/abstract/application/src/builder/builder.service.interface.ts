import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeModel,
} from '../renderer'

export type IBuilderComponent = IAtomModel

export interface IBuilderService {
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<IRuntimeComponentModel>
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IBuilderComponent>>
  expandedElementTreeNodeIds: Array<string>
  hoveredNode: Nullable<Ref<IRuntimeModel>>
  selectedNode: Nullable<Ref<IRuntimeModel>>

  selectComponentNode(node: Nullish<Ref<IRuntimeComponentModel>>): void
  selectElementNode(node: Nullish<Ref<IRuntimeElementModel>>): void
  selectPreviousElementOnDelete(): void
  setExpandedElementTreeNodeIds(expandedNodeIds: Array<string>): void
  setHoveredNode(node: Nullable<Ref<IRuntimeModel>>): void
  setSelectedNode(node: Nullable<Ref<IRuntimeModel>>): void
}
