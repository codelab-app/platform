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

export class ReactGridItem {
  declare layout: Layout
}
