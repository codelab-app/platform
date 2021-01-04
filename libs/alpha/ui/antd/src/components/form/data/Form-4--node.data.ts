import { Button } from '../../button'
import { Text } from '../../text'
import { CodelabForm } from '../Form'
import { Form } from '../Form.types'
import {
  NodeReactI,
  NodeType,
  nodeTypeEntries,
} from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const nodeFormData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: NodeType.React_Form,
  props: {
    ctx: { __type: [PropType.Eval], value: '' },
    name: 'basic',
    initialValues: { node_type: 'React' },
    onFinish: '() => console.log("good")',
  },
  children: [
    CodelabForm.createSelect({
      label: 'Node Type',
      name: 'node_type',
      options: nodeTypeEntries,
      showSearch: true,
      filterOption: {
        __type: [PropType.Eval],
        value:
          'return (input, option) => option.children.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0',
      },
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
