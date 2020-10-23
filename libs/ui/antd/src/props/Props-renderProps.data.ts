import { NodeI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const renderPropsData: NodeI = {
  type: NodeType.React_Html_Div,
  props: {
    visibility: '',
    singleprops: {
      __type: [PropType.Single],
      value: PropType.Single,
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      props: {
        childprops: {
          __type: [PropType.Eval],
          value: 'return this.singleprops',
        },
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            grandchildprops: {
              __type: [PropType.Eval],
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
      __type: [PropType.Leaf],
      value: PropType.Leaf,
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      props: {
        childprops: {
          __type: [PropType.Eval],
          // value: 'return console.log(this.leafprops)',
          value: 'return this.leafprops',
        },
      },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: {
            grandchildprops: {
              __type: [PropType.Eval],
              // value: 'return console.log(this)',
              value: 'return this.leafprops',
            },
          },
        },
      ],
    },
  ],
}
