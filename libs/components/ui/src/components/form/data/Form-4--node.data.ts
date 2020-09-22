import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import {
  NodeDtoReactI,
  nodeTypeEnumEntries,
} from '@codelab/shared/interface/node'

export const nodeFormData: NodeDtoReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.Form',
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
      options: nodeTypeEnumEntries,
    }),
    {
      type: 'React.Form.Item',
      children: [
        {
          type: 'React.Button',
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: 'React.Text',
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
