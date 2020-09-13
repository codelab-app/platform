import { ReactNodeI, NodeTypeEnum } from '@codelab/shared/interface/node'
import { Button } from '../../button'
import { Form } from '../Form.types'
import { Text } from '../../text'

export const nodeFormData: ReactNodeI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'Form',
  nodeType: 'React',
  props: {
    ctx: { eval: true, value: '' },
    name: 'basic',
    initialValues: { node_type: 'React' },
    onFinish: '() => console.log("good")',
  },
  children: [
    Form.createSelect({
      label: 'Node Type',
      name: 'node_type',
      options: NodeTypeEnum,
    }),
    {
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
    },
  ],
}
