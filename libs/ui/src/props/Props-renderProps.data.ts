import { ReactNodeI } from '@codelab/shared/interface/node'

export const renderPropsData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
      value: {},
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            grandchildprops: {},
          },
        },
      ],
    },
  ],
}

export const leafRenderPropsData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    visibility: '',
    leafprops: {
      renderProps: 'leaf',
      value: {},
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        childprops: {},
      },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: {
            grandChildProps: {},
          },
        },
      ],
    },
  ],
}
