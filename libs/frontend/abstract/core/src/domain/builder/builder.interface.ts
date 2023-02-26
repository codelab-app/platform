import type { Nullable } from '@codelab/shared/abstract/types'
import type { ICreateElementData } from '../element'

export interface MoveData {
  parentElementId: Nullable<string>
  prevSiblingId: Nullable<string>
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
  [BuilderWidthBreakPoints.Mobile]: { min: 240, max: 479, default: 320 },
  [BuilderWidthBreakPoints.MobileVertical]: {
    min: 480,
    max: 767,
    default: 568,
  },
  [BuilderWidthBreakPoints.TabletHorizontal]: {
    min: 768,
    max: 991,
    default: 768,
  },
  // -1 means automatically set the value for this field to the max available space
  [BuilderWidthBreakPoints.Desktop]: { min: 992, max: -1, default: -1 },
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
