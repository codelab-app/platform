import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const submitButtonData: NodeReactI = {
  type: NodeType.React_Form_Item,
  children: [
    {
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        htmlType: 'submit',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Submit',
          },
        },
      ],
    },
  ],
}
