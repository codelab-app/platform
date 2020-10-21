import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

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
