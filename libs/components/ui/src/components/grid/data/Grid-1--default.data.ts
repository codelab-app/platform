import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../../text'
import { Grid } from '../Grid.types'

export const gridData: ReactNodeI<
  | Text.Props
  | Grid.Props
  | Grid.ItemProps
  | Grid.ResponsiveProps
  | { key: string }
> = {
  type: 'Grid',
  nodeType: 'React',
  props: {
    cols: 12,
    rowHeight: 30,
    width: 1200,
    layout: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
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
