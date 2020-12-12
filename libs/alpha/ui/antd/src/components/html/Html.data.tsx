import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const divData: NodeReactI = {
  type: NodeType.React_Html_Div,
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      props: {
        childprops: {},
      },
    },
  ],
}
