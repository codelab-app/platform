import { ReactNodeI } from '../../../node/src/subtypes/react/Node-react'

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
    },
  ],
}

export const leafRenderPropsData: ReactNodeI = {
  type: 'Html.div',
  nodeType: 'React',
  props: {
    visibility: '',
    leafprops: {
      renderProps: { leaf: true },
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
