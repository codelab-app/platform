import { ResponsiveProps } from 'react-grid-layout'

export type ReactGridResponsiveLayout = Pick<
  ResponsiveProps,
  'layouts' | 'breakpoints' | 'cols'
>
