import { Button } from '../../button'
import { Text } from '../../text'
import { CodelabForm } from '../Form'
import { Form } from '../Form.types'
import { NodeReactI, nodeTypeEntries } from '@codelab/shared/interface/node'

export const nodeFormData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.Form',
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
