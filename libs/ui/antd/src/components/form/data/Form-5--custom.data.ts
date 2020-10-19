import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const formCustomData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.CustomForm',
  props: {
    name: 'basic',
    initialValues: {
      id: '1',
      info: [
        { key: 'user.address.number', value: '1200' },
        { key: 'user.address.street', value: 'Park ave.' },
        { key: 'user.address.city', value: 'London' },
      ],
    },
    onFinish: {
      __type: ['Eval'],
      value: `return (values) => console.log(JSON.stringify(values))`,
    },
  },
  children: [
    {
      type: 'React.Form.Item',
      props: {
        label: 'ID',
        name: 'id',
      },
      children: [
        {
          type: 'React.Input',
          props: {},
        },
      ],
    },
    {
      type: 'React.Form.List',
      props: {
        name: 'info',
      },
      children: [
        {
          type: 'React.Form.Item',
          props: {
            name: 'key',
            label: 'Key',
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
            name: 'value',
            label: 'Value',
          },
          children: [
            {
              type: 'React.Input',
            },
          ],
        },
      ],
    },
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
