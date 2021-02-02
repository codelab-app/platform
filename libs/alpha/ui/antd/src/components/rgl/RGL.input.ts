import { Layout } from 'react-grid-layout'

type LayoutSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

/**
 * Or we can use LayoutSize as enum if easier
 */

// @Tabs({ keys: LayoutSize })
export class ReactGridResponsiveLayout {
  declare breakpoints: Record<LayoutSize, number>

  declare cols: Record<LayoutSize, number>

  declare layouts: Record<LayoutSize, Layout>
}

// @Grid({
//   'prop.x': {},
//   'prop.y': {},
// })
export class ReactGridItem {
  declare props: { 'data-grid': Omit<Layout, 'i' | 'moved'> } & { key: string }
}
