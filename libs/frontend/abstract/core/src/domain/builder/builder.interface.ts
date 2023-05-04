import type { IEntity } from '@codelab/shared/abstract/types'
import type { ICreateElementData } from '../element'

export interface MoveData {
  parentElement: IEntity
  prevSibling: IEntity
}

export interface BuilderDragData {
  createElementInput?: ICreateElementData
  icon?: string
  name?: string
  type: BuilderDndType
}

export interface BuilderDropData {
  dragPosition?: DragPosition
}

export interface BuilderWidth {
  default: number
  max: number
  min: number
}

export const enum BuilderWidthBreakPoints {
  Desktop = 'desktop',
  Mobile = 'mobile',
  MobileVertical = 'mobile-vertical',
  TabletHorizontal = 'tablet-horizontal',
}

export enum BuilderDndType {
  CreateElement = 'CreateElement',
  MoveElement = 'MoveElement',
}

export enum DragPosition {
  After = 'After',
  Before = 'Before',
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
  [BuilderWidthBreakPoints.Desktop]: { default: 992, max: 1920, min: 992 },
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
