import { Nullable } from '@codelab/shared/abstract/types'
import { ICreateElementDTO } from '../element'

export interface MoveData {
  parentElementId: Nullable<string>
  prevSiblingId: Nullable<string>
}

export interface BuilderDragData {
  type: BuilderDndType
  createElementInput?: ICreateElementDTO
  name?: string
  icon?: string
}

export interface BuilderDropData {
  dragPosition: DragPosition
}

// export type BuilderDropData = Pick<
//   BuilderDragData,
//   'type' | 'createElementInput'
// >

export enum BuilderDndType {
  CreateElement = 'CreateElement',
  MoveElement = 'MoveElement',
}

export enum DragPosition {
  Before = 'Before',
  After = 'After',
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
