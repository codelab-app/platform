import { AtomType, NodeI } from '@codelab/frontend'

export const rglData: NodeI = {
  type: AtomType.ReactRglContainer,
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
      type: AtomType.ReactHtmlDiv,
      props: {
        key: 'a',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'A',
          },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      props: {
        key: 'b',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'B',
          },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      props: {
        key: 'c',
        style: { border: '1px solid #000', padding: 10 },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'C',
          },
        },
      ],
    },
  ],
}
