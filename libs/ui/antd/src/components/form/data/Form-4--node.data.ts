import { Button } from '../../button'
import { Text } from '../../text'
import { CodelabForm } from '../Form'
import { Form } from '../Form.types'
import {
  NodeReactI,
  NodeType,
  nodeTypeEntries,
} from '@codelab/shared/interface/node'

export const nodeFormData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: NodeType.React_Form,
  props: {
    ctx: { __type: ['Eval'], value: '' },
    name: 'basic',
    initialValues: { node_type: 'React' },
    onFinish: '() => console.log("good")',
  },
  children: [
    CodelabForm.createSelect({
      label: 'Node Type',
      name: 'node_type',
      options: nodeTypeEntries,
    }),
    {
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
    },
  ],
}
