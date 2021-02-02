import { Text } from '../../text'
import { RGL } from '../RGL.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const responsiveGridData: NodeReactI<
  Text.Props | RGL.Props | RGL.ItemProps | RGL.ResponsiveProps | { key: string }
> = {
  type: NodeType.React_ResponsiveGrid,
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
      type: NodeType.React_Html_Div,
      props: {
        key: 'a',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'A',
          },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: {
        key: 'b',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'B',
          },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: {
        key: 'c',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'C',
          },
        },
      ],
    },
  ],
}
