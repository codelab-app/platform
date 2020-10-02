import { NodeI } from '@codelab/shared/interface/node'

export const renderPropsData: NodeI = {
  type: 'React.Html.div',
  props: {
    visibility: '',
    singleprops: {
      __type: ['Single'],
      value: 'single',
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {
          __type: ['Eval'],
          value: 'return this.singleprops',
        },
      },
      children: [
        {
          type: 'React.Html.div',
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
  type: 'React.Html.div',
  props: {
    visibility: '',
    leafprops: {
      __type: ['Leaf'],
      value: 'leaf',
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {
          __type: ['Eval'],
          // value: 'return console.log(this.leafprops)',
          value: 'return this.leafprops',
        },
      },
      children: [
        {
          type: 'React.Html.div',
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
