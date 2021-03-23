import { PropType } from '../../../props/PropType'
import { CodelabForm } from '../Form'
import { AtomType, NodeI } from '@codelab/frontend'

export const nodeFormData: NodeI = {
  type: AtomType.ReactForm,
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
      options: [],
      showSearch: true,
      filterOption: {
        __type: [PropType.Eval],
        value:
          'return (input, option) => option.children.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0',
      },
    }),
    {
      type: AtomType.ReactFormItem,
      children: [
        {
          type: AtomType.ReactButton,
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: AtomType.ReactText,
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
