import { Nullable } from '@codelab/shared/abstract/types'
import { ICreateElementDTO } from '../element'

export interface MoveData {
  parentElementId: Nullable<string>
  prevSiblingId: Nullable<string>
}

export interface BuilderDragData {
  type: BuilderDndType.CreateElement
  createElementInput: ICreateElementDTO
  name: string
  icon: string
}

export type BuilderDropData = Pick<
  BuilderDragData,
  'type' | 'createElementInput'
>

export enum BuilderDndType {
  CreateElement = 'CreateElement',
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
