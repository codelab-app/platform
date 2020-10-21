import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const hooksData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: NodeType.React_Fragment,
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
      type: NodeType.React_Form,
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
          type: NodeType.React_Form_Item,
          props: {
            label: 'Name',
            name: ['name'],
          },
          children: [
            {
              type: NodeType.React_Input,
            },
          ],
        },
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'reset_button',
          },
          children: [
            {
              type: NodeType.React_Button,
              props: {
                type: 'primary',
                onClick: {
                  __type: ['Eval'],
                  value: 'return () => this.form.resetFields()',
                },
              },
              children: [
                {
                  type: NodeType.React_Text,
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
