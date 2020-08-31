import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { GridProps, ResponsiveGridProps, GridItemProps } from './Grid.types'

export const responsiveGridData: ReactNodeI<
  TextProps | GridProps | GridItemProps | ResponsiveGridProps | { key: string }
> = {
  type: 'ResponsiveGrid',
  nodeType: 'React',
  props: {
    layouts: {
      lg: [
        { i: 'a', x: 0, y: 0, w: 1, h: 2 },
        { i: 'b', x: 1, y: 0, w: 3, h: 2 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 },
      ],
      md: [
        { i: 'a', x: 0, y: 0, w: 1, h: 2 },
        { i: 'b', x: 1, y: 0, w: 3, h: 2 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 },
      ],
      sm: [
        { i: 'a', x: 0, y: 0, w: 1, h: 2 },
        { i: 'b', x: 1, y: 0, w: 3, h: 4 },
        { i: 'c', x: 0, y: 2, w: 1, h: 2 },
      ],
    },
    rowHeight: 30,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        key: 'a',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'A',
          },
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        key: 'b',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'B',
          },
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        key: 'c',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'C',
          },
        },
      ],
    },
  ],
}
