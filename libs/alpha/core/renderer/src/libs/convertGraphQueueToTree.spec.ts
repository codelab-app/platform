import { convertGraphToTree } from './convertGraphQueueToTree'
import { IGraphData } from './renderer-graph-components'

describe('convertGraphToTree', () => {
  const data: IGraphData = {
    graph: [
      {
        id: 'g1',
        label: 'label',
        edges: [
          {
            source: 'v1',
            target: 'v1_1',
            id: 'e1',
            props: {},
          },
          {
            source: 'v1',
            target: 'v1_2',
            id: 'e2',
            props: {},
          },
          {
            source: 'v1_1',
            target: 'v1_1_1',
            id: 'e3',
            props: {},
          },
          {
            source: 'v1_2',
            target: 'v1_2_1',
            id: 'e4',
            props: {},
          },
        ],
        vertices: [
          {
            id: 'v1',
            type: 'React_Fragment',
            props: {},
          },
          {
            id: 'v1_1',
            type: 'React_Button',
            props: { type: 'primary' },
          },
          {
            id: 'v1_1_1',
            type: 'React_Text',
            props: { value: 'Click me' },
          },
          {
            id: 'v1_2',
            type: 'React_Html_Div',
            props: {},
          },
          {
            id: 'v1_2_1',
            type: 'React_Text',
            props: { value: 'Text node' },
          },
        ],
      },
    ],
  }
  const tree = {
    id: 'v1',
    type: 'React_Fragment',
    props: {},
    children: [
      {
        id: 'v1_1',
        type: 'React_Button',
        props: { type: 'primary' },

        children: [
          {
            id: 'v1_1_1',
            type: 'React_Text',
            props: { value: 'Click me' },
          },
        ],
      },

      {
        id: 'v1_2',
        type: 'React_Html_Div',
        props: {},
        children: [
          {
            id: 'v1_2_1',
            type: 'React_Text',
            props: { value: 'Text node' },
          },
        ],
      },
    ],
  }

  it('can convert graph representation to tree', () => {
    expect(convertGraphToTree(data)).toEqual(tree)
  })
})
