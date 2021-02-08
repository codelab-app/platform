import { Layout } from 'react-grid-layout'
import { Grid } from '@codelab/tools/generators/json-schema'

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

export type RGLItemProps = {
  'data-grid': Pick<Layout, 'x' | 'y' | 'w' | 'h'>
} & { key: string }

@Grid<ReactGridItem>({
  props: {
    'data-grid': {
      x: {
        __grid: {
          order: 0,
          span: 6,
        },
      },
      y: {
        __grid: {
          order: 1,
          span: 6,
        },
      },
      w: {
        __grid: {
          order: 2,
          span: 6,
        },
      },
      h: {
        __grid: {
          order: 3,
          span: 6,
        },
      },
    },
    key: {
      __grid: {
        order: 4,
        span: 6,
      },
    },
  },
})
export class ReactGridItem {
  declare props: RGLItemProps
}
