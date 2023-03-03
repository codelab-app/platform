import { useMediaQuery } from 'react-responsive'

export const breakpoints = {
  // Desktop
  lg: [992, 1199],

  // Tablet
  md: [768, 991],

  // Mobile + Tablet
  sm: [576, 767],

  // Desktop Lg
  xl: [1200, 1599],

  // Mobile
  xs: [0, 575],

  // Desktop XL
  xxl: [1600],
}

export const useMobileOrTabletMediaQuery = () => {
  return useMediaQuery({
    maxWidth: breakpoints.sm[1],
  })
}
