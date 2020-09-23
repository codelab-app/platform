import { NodeI } from '@codelab/shared/interface/node'

export const renderPropsData: NodeI = {
  type: 'React.Html.div',
  props: {
    visibility: '',
    singleprops: {
      __type: 'single',
      value: 'single',
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {
          __type: 'eval',
          value: 'return this.props.singleprops',
        },
      },
      children: [
        {
          type: 'React.Html.div',
          props: {
            grandchildprops: {
              __type: 'eval',
              value: 'return this.props.singleprops',
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
      __type: 'leaf',
      value: 'leaf',
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {
          __type: 'eval',
          value: 'return this.props.leafprops',
        },
      },
      children: [
        {
          type: 'React.Html.div',
          props: {
            grandchildprops: {
              __type: 'eval',
              value: 'return this.props.leafprops',
            },
          },
        },
      ],
    },
  ],
}
