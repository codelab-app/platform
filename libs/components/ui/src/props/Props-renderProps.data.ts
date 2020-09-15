import { NodeDtoI } from '@codelab/shared/interface/node'

export const renderPropsData: NodeDtoI = {
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

export const leafRenderPropsData: NodeDtoI = {
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
