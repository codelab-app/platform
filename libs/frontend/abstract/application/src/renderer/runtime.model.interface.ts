import type { Nullable } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'

import type {
  IElementTreeViewDataNode,
  IElementTreeViewDataNodePreview,
} from '../builder'
import type { IRuntimeComponentModel } from './runtime-component'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'
import type { IRuntimeStoreModel } from './runtime-store'

export type IRuntimePageNode = IRuntimeComponentModel | IRuntimeElementModel

export type IRuntimeContainerNode = IRuntimeComponentModel | IRuntimePageModel

export type IRuntimeModel =
  | IRuntimeComponentModel
  | IRuntimeElementModel
  | IRuntimePageModel

export type IRuntimeModelRef =
  | Ref<IRuntimeComponentModel>
  | Ref<IRuntimeElementModel>
  | Ref<IRuntimePageModel>

/**
 * Shared between all 3 runtime models
 */
export interface IBaseRuntimeModel extends AnyModel {
  compositeKey: string
  render: Nullable<ReactElement>
  /**
   * access runtimeStore via computed values
   */
  runtimeStore: IRuntimeStoreModel
  /**
   * Contains full information about the node, not good for performance since may cause re-renders, only use this for the tree view.
   *
   * Mainly the `children` property will change if we add any elements
   */
  treeViewNode: IElementTreeViewDataNode
  /**
   * Create a separate version for common usage, this removes `children` property to help with re-rendering issues
   */
  treeViewNodePreview: IElementTreeViewDataNodePreview
  detach(): void
}
