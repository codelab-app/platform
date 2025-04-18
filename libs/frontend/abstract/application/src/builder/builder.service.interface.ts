import type { IAtomModel } from '@codelab/frontend-abstract-domain'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeComponentModel, IRuntimeModel } from '../renderer'

export interface IBuilderService {
  /**
   * Computed from selectedNode, the selected node may or may not be a component, and there may be no selected node
   */
  activeComponent: Nullable<IRuntimeComponentModel>
  componentTagNames: Array<string>
  componentsGroupedByCategory: Record<string, Array<IAtomModel>>
  hoveredNode: Nullable<Ref<IRuntimeModel>>
  selectedNode: Nullable<Ref<IRuntimeModel>>
  selectPreviousElementOnDelete(): void
  setHoveredNode(node: Nullable<Ref<IRuntimeModel>>): void
  setSelectedNode(node: Nullable<Ref<IRuntimeModel>>): void
}
