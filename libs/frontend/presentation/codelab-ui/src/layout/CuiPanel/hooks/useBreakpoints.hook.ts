import { BreakpointSize } from '@codelab/frontend-abstract-types'
import { useWindowSize } from 'react-use'

/* eslint-disable @typescript-eslint/member-ordering */
interface Breakpoint {
  default: number
  min: number
  max: number
}

/* eslint-disable @typescript-eslint/member-ordering */
export interface ResponsiveBreakpoints {
  default: Breakpoint
  xs?: Breakpoint
  sm?: Breakpoint
  md?: Breakpoint
  lg?: Breakpoint
  xl?: Breakpoint
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '2xl'?: Breakpoint
}

/**
 * Based on screen width, see which breakpoint we are using
 */
export const useBreakpoint = (
  breakpoints: ResponsiveBreakpoints,
): Breakpoint => {
  const { height, width } = useWindowSize()

  if (width >= BreakpointSize['2xl']) {
    return breakpoints['2xl'] ?? breakpoints.default
  }

  if (width >= BreakpointSize.xl) {
    return breakpoints.xl ?? breakpoints.default
  }

  if (width >= BreakpointSize.lg) {
    return breakpoints.lg ?? breakpoints.default
  }

  if (width >= BreakpointSize.md) {
    return breakpoints.md ?? breakpoints.default
  }

  if (width >= BreakpointSize.sm) {
    return breakpoints.sm ?? breakpoints.default
  }

  if (width >= BreakpointSize.xs) {
    return breakpoints.xs ?? breakpoints.default
  }

  return breakpoints.default
}
