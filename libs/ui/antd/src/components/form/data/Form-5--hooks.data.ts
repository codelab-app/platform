import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const hooksData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: NodeType.React_Fragment,
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
      type: NodeType.React_Form,
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
                  __type: [PropType.Eval],
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
