import { Property, Schema, Title, getJsonSchema } from '@tsed/schema'
import { Layout } from 'react-grid-layout'
import { RGLLayoutProps } from './RGL-item.input'
import { Grid } from '@codelab/tools/generators/json-schema'

export type LayoutSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

/**
 * Or we can use LayoutSize as enum if easier
 */
// @Tabs({ keys: LayoutSize })
// export class ReactGridResponsiveLayout {
//   declare breakpoints: Record<LayoutSize, number>

//   declare cols: Record<LayoutSize, number>

//   declare layouts: Record<LayoutSize, Layout>
// }

@Grid<any>({
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
})
@Title('RGL Item')
export class RGLItemProps {
  // Can't use RGLLayoutProps as type, otherwise we'll get a $ref generated
  @Schema(getJsonSchema(RGLLayoutProps))
  // declare 'data-grid': RGLLayoutProps
  declare 'data-grid': Layout

  @Property()
  declare key: string
}
