import { IComponentGraph } from '@codelab/core/renderer'
import { NodeType } from '@codelab/shared/interface/node'

export const renderGraphData: IComponentGraph = {
  vertices: [
    {
      id: '1',
      type: NodeType.React_Html_Div,
      props: {
        style: { background: 'antiquewhite', padding: '12px' },
      },
      parent: null,
    },
    {
      id: '2',
      type: NodeType.React_Text,
      props: {
        value: 'Root node (parent)',
      },
      parent: '1',
    },
    {
      id: '3',
      type: NodeType.React_Html_Div,
      props: {
        style: {
          border: '1px solid #ddd',
          backgroundColor: '#eee',
          height: '200px',
          width: '200px',
          padding: '12px',
        },
      },
      parent: '1',
    },

    {
      id: '4',
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        onClick: () => console.log('Button click'),
      },
      parent: '3',
    },
    {
      id: '5',
      type: NodeType.React_Text,
      props: {
        value: 'Click me',
      },
      parent: '4',
    },

    {
      id: '6',
      type: NodeType.React_Html_P,
      props: {
        style: {
          border: '1px solid #ddd',
          backgroundColor: 'aquamarine',
          padding: '12px',
          marginTop: '12px',
        },
      },
      parent: '3',
    },
    {
      id: '7',
      type: NodeType.React_Text,
      props: {
        value: 'paragraph text CHILD',
      },
      parent: '6',
    },
  ],
  edges: [
    { id: '6-7', start: '6', end: '7' },
    { id: '1-2', start: '1', end: '2' },
    { id: '1-3', start: '1', end: '3' },
    { id: '3-4', start: '3', end: '4' },
    { id: '3-6', start: '3', end: '6' },
    { id: '6-7', start: '6', end: '7' },
    { id: '4-5', start: '4', end: '5' },
  ],
}
