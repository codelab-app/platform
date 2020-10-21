import { NodeI, NodeType } from '@codelab/shared/interface/node'

export const renderPropsData: NodeI = {
  type: NodeType.React_Html_Div,
  props: {
    visibility: '',
    singleprops: {
      __type: ['Single'],
      value: 'single',
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      props: {
        childprops: {
          __type: ['Eval'],
          value: 'return this.singleprops',
        },
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            grandchildprops: {
              __type: ['Eval'],
              value: 'return this.singleprops',
            },
          },
        },
      ],
    },
  ],
}

export const leafRenderPropsData: NodeI = {
  type: NodeType.React_Html_Div,
  props: {
    visibility: '',
    leafprops: {
      __type: ['Leaf'],
      value: 'leaf',
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      props: {
        childprops: {
          __type: ['Eval'],
          // value: 'return console.log(this.leafprops)',
          value: 'return this.leafprops',
        },
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            grandchildprops: {
              __type: ['Eval'],
              // value: 'return console.log(this)',
              value: 'return this.leafprops',
            },
          },
        },
      ],
    },
  ],
}
