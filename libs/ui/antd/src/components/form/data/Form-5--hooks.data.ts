import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const hooksData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.Fragment',
  props: {
    form: {
      __type: ['Eval', 'Single'],
      value: `
        const [form] = this.antd.Form.useForm();
        return form
        `,
    },
  },
  children: [
    {
      type: 'React.Form',
      props: {
        name: 'form-hooks',
        initialValues: {
          name: 'Codelab',
        },
        form: {
          __type: ['Eval', 'Leaf'],
          value: `return this.form`,
        },
        onFinish: {
          __type: ['Leaf', 'Eval'],
          value: 'console.log(this); return (values) => console.log(values)',
        },
      },
      children: [
        {
          type: 'React.Form.Item',
          props: {
            label: 'Name',
            name: ['name'],
          },
          children: [
            {
              type: 'React.Input',
            },
          ],
        },
        {
          type: 'React.Form.Item',
          props: {
            name: 'reset_button',
          },
          children: [
            {
              type: 'React.Button',
              props: {
                type: 'primary',
                onClick: {
                  __type: ['Eval'],
                  value: 'return () => this.form.resetFields()',
                },
              },
              children: [
                {
                  type: 'React.Text',
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
