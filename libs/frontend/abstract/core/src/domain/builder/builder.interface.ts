import type { IEntity } from '@codelab/shared/abstract/types'
import type { ICreateElementData } from '../element'

export interface MoveData {
  parentElement: IEntity
  prevSibling: IEntity
}

export interface BuilderDragData {
  type: BuilderDndType
  createElementInput?: ICreateElementData
  name?: string
  icon?: string
}

export interface BuilderDropData {
  dragPosition?: DragPosition
}

export interface BuilderWidth {
  min: number
  max: number
  default: number
}

export const enum BuilderWidthBreakPoints {
  Mobile = 'mobile',
  MobileVertical = 'mobile-vertical',
  TabletHorizontal = 'tablet-horizontal',
  Desktop = 'desktop',
}

export enum BuilderDndType {
  CreateElement = 'CreateElement',
  MoveElement = 'MoveElement',
}

export enum DragPosition {
  Before = 'Before',
  After = 'After',
  Inside = 'Inside',
}

export const defaultBuilderWidthBreakPoints: Record<
  BuilderWidthBreakPoints,
  BuilderWidth
> = {
  [BuilderWidthBreakPoints.Mobile]: { default: 320, max: 479, min: 240 },
  [BuilderWidthBreakPoints.MobileVertical]: {
    default: 568,
    max: 767,
    min: 480,
  },
  [BuilderWidthBreakPoints.TabletHorizontal]: {
    default: 768,
    max: 991,
    min: 768,
  },
  // -1 means automatically set the value for this field to the max available space
  [BuilderWidthBreakPoints.Desktop]: { default: -1, max: -1, min: 992 },
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
