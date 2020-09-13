import { ReactNodeI, NodeTypeEnum } from '@codelab/shared/interface/node'
import { Select } from '../../select/Select.types'
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
    initialValues: { nodeType: 'React' },
    onFinish: '() => console.log("good")',
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Select',
        name: 'nodeType',
      },
      children: [
        {
          type: 'Select',
          nodeType: 'React',
          props: {
            style: {
              width: 120,
            },
          },
          children: Select.createOptions(NodeTypeEnum),
        },
      ],
    },
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
