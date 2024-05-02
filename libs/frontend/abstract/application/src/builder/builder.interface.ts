import type { IRef } from '@codelab/shared/abstract/core'

export interface MoveData {
  parentElement: IRef
  prevSibling: IRef
}

export enum RendererTab {
  Component = 'Component',
  Page = 'Page',
}

export interface BuilderWidth {
  default: number
  max: number
  min: number
}

export const enum BuilderWidthBreakPoint {
  Desktop = 'desktop',
  MobilePortrait = 'mobile-portrait',
  MobileLandscape = 'mobile-landscape',
  Tablet = 'tablet',
  None = 'none',
}

export const defaultBuilderWidthBreakPoints: Record<
  BuilderWidthBreakPoint,
  BuilderWidth
> = {
  [BuilderWidthBreakPoint.MobilePortrait]: {
    default: 360,
    max: 479,
    min: 240,
  },
  [BuilderWidthBreakPoint.MobileLandscape]: {
    default: 568,
    max: 767,
    min: 480,
  },
  [BuilderWidthBreakPoint.Tablet]: {
    default: 768,
    max: 991,
    min: 768,
  },
  [BuilderWidthBreakPoint.Desktop]: { default: 992, max: 1920, min: 992 },
  // -1 means automatically set the value for this field to the max available space
  [BuilderWidthBreakPoint.None]: { default: -1, max: -1, min: -1 },
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
