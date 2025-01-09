import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import type { IElementTreeViewDataNode } from '../../builder'
import type { IBaseRuntimeModel } from '../runtime.model.interface'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'

/**
 * Represents runtime model IComponentModel
 */
export interface IRuntimeComponentModel extends IBaseRuntimeModel {
  /**
   * If runtime component is created by child mapper this sets child index
   * this could be different from the child render index if element has children
   * other than ones created by child mapper
   */
  childMapperIndex: Maybe<number>
  /**
   * Children of the instance element which will be added as componentProp.children prop
   */
  children: Array<IRuntimeElementModel>
  /**
   * Exposed for external use by other models and to preserve structure
   */
  component: Ref<IComponentModel>
  isChildMapperComponentInstance: boolean
  isTypedProp?: boolean
  /**
   * Exposed for external use by other models and to preserve structure
   */
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeProps: IRuntimeComponentPropModel
  runtimeRootElement: IRuntimeElementModel
  setChildMapperIndex(index: number): void
}
