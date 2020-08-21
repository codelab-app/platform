import { ReactNodeI } from '@codelab/graph'

export const gridData: ReactNodeI = {
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
    className: 'layout',
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        key: 'a',
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
