import { NodeI } from '@codelab/shared/interface/node'

export const renderPropsData: NodeI = {
  type: 'React.Html.div',
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
      value: {},
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'React.Html.div',
          props: {
            grandchildprops: {},
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
      renderProps: 'leaf',
      value: {},
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'React.Html.div',
          props: {
            grandChildProps: {},
          },
        },
      ],
    },
  ],
}
