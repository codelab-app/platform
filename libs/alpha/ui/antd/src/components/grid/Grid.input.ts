import { Layout } from 'react-grid-layout'

// export type ReactGridResponsiveLayout = Pick<
//   ResponsiveProps,
//   'layouts' | 'breakpoints' | 'cols'
// >

type LayoutSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

export type ReactGridResponsiveLayout = {
  breakpoints: Record<LayoutSize, number>
  cols: Record<LayoutSize, number>
  layouts: Record<LayoutSize, Layout>
}
