import { useMediaQuery } from 'react-responsive'

export const breakpoints = {
  // Mobile
  xs: [0, 575],

  // Mobile + Tablet
  sm: [576, 767],

  // Tablet
  md: [768, 991],

  // Desktop
  lg: [992, 1199],

  // Desktop Lg
  xl: [1200, 1599],

  // Desktop XL
  xxl: [1600],
}

export const useMobileOrTabletMediaQuery = () => {
  return useMediaQuery({
    maxWidth: breakpoints.sm[1],
  })
}
