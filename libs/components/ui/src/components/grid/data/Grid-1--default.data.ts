import { Text } from '../../text'
import { Grid } from '../Grid.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const gridData: NodeDtoI<
  | Text.Props
  | Grid.Props
  | Grid.ItemProps
  | Grid.ResponsiveProps
  | { key: string }
> = {
  type: 'React.Grid',
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
      type: 'React.Html.div',
      props: {
        key: 'a',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'A',
          },
        },
      ],
    },
    {
      type: 'React.Html.div',
      props: {
        key: 'b',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'B',
          },
        },
      ],
    },
    {
      type: 'React.Html.div',
      props: {
        key: 'c',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'C',
          },
        },
      ],
    },
  ],
}
