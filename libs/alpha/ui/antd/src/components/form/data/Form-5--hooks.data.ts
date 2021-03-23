import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const hooksData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    form: {
      __type: [PropType.Eval, PropType.Single],
      value: `
        const [form] = this.antd.Form.useForm();
        return form
        `,
    },
  },
  children: [
    {
      type: AtomType.ReactForm,
      props: {
        name: 'form-hooks',
        initialValues: {
          name: 'Codelab',
        },
        form: {
          __type: [PropType.Eval, PropType.Leaf],
          value: `return this.form`,
        },
        onFinish: {
          __type: [PropType.Leaf, PropType.Eval],
          value: 'console.log(this); return (values) => console.log(values)',
        },
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            label: 'Name',
            name: ['name'],
          },
          children: [
            {
              type: AtomType.ReactInput,
            },
          ],
        },
        {
          type: AtomType.ReactFormItem,
          props: {
            name: 'reset_button',
          },
          children: [
            {
              type: AtomType.ReactButton,
              props: {
                type: 'primary',
                onClick: {
                  __type: [PropType.Eval],
                  value: 'return () => this.form.resetFields()',
                },
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Reset',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
