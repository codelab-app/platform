import type { IBreakpoint } from '@codelab/frontend/abstract/types'
import { IBreakpointType } from '@codelab/shared/abstract/core'

export const breakpoints: Record<IBreakpointType, IBreakpoint> = {
  [IBreakpointType.MobilePortrait]: {
    default: 360,
    max: 479,
    min: 240,
  },
  [IBreakpointType.MobileLandscape]: {
    default: 568,
    max: 767,
    min: 480,
  },
  [IBreakpointType.Tablet]: {
    default: 768,
    max: 991,
    min: 768,
  },
  [IBreakpointType.Desktop]: { default: 992, max: 1920, min: 992 },
  [IBreakpointType.None]: { default: -1, max: -1, min: -1 },
}
