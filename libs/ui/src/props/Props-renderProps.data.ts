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

export const div = {
  type: 'Html.div',
  nodeType: 'React',
}
