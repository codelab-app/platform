import { type IRef } from '@codelab/shared-abstract-core'

export interface MoveData {
  parentElement: IRef
  prevSibling: IRef
}

/**
 * Useful data related to builder
 */
export interface IBuilderState {
  /**
   * Currently active component if any
   */
  componentId: string | undefined
}
