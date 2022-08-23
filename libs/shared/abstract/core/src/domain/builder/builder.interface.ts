import { ICreateElementDTO } from '../element'

export interface MoveData {
  order: number
  parentElementId: string
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
