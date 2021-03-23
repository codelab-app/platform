import { PropType } from './PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const renderPropsData: NodeI = {
  type: AtomType.ReactHtmlDiv,
  props: {
    visibility: '',
    singleprops: {
      __type: [PropType.Single],
      value: PropType.Single,
    },
  },
  children: [
    {
      type: AtomType.ReactHtmlDiv,
      props: {
        childprops: {
          __type: [PropType.Eval],
          value: 'return this.singleprops',
        },
      },
      children: [
        {
          type: AtomType.ReactHtmlDiv,
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
  type: AtomType.ReactHtmlDiv,
  props: {
    visibility: '',
    leafprops: {
      __type: [PropType.Leaf],
      value: PropType.Leaf,
    },
  },
  children: [
    {
      type: AtomType.ReactHtmlDiv,
      props: {
        childprops: {
          __type: [PropType.Eval],
          // value: 'return console.log(this.leafprops)',
          value: 'return this.leafprops',
        },
      },
      children: [
        {
          type: AtomType.ReactHtmlDiv,
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
