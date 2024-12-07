/* eslint-disable perfectionist/sort-enums */
export enum BreakpointSize {
  xs = 0,
  // => @media (min-width: 576px) { ... }
  sm = 576,
  // => @media (min-width: 768px) { ... }
  md = 768,
  // => @media (min-width: 992px) { ... }
  lg = 992,
  // => @media (min-width: 1200px) { ... }
  xl = 1200,
  // => @media (min-width: 1600px) { ... }
  '2xl' = 1600,
}
