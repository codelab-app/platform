import { ReactNodeI } from '@codelab/shared/interface/node'

export const CreateNodeFormSubmitBtn: ReactNodeI = {
  type: 'Form.Item',
  nodeType: 'React',
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: {
        type: 'primary',
        htmlType: 'submit',
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Submit',
          },
        },
      ],
    },
  ],
}
