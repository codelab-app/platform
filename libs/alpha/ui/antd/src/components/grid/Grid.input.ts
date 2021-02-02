import { Layout } from 'react-grid-layout'
import { Grid } from '@codelab/tools/generators/json-schema'

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

export class DemoGridFormInput {
  @Grid({ order: 3, span: 24 })
  email = ''

  @Grid({ order: 2, span: 24 })
  password = ''

  @Grid({ order: 0, span: 12 })
  firstname = ''

  @Grid({ order: 1, span: 12 })
  lastname = ''

  notGroupedField = ''
}
