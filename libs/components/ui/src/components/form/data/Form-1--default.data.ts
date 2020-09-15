import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const formDefaultData: NodeDtoI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.Form',
  props: {
    ctx: { eval: true, value: '' },
    name: 'basic',
    initialValues: { select: 'a' },
    onFinish: '() => console.log("good")',
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
      type: 'React.Form.Item',
      props: {
        label: 'Checkbox',
        name: 'checkbox',
        valuePropName: 'checked',
      },
      children: [
        {
          type: 'React.Checkbox',
        },
      ],
    },
    {
      type: 'React.Form.Item',
      props: {
        label: 'Select',
        name: 'select',
      },
      children: [
        {
          type: 'React.Select',
          props: {
            style: {
              width: 120,
            },
          },
          children: [
            {
              type: 'React.Select.Option',
              props: {
                value: 'a',
              },
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'A',
                  },
                },
              ],
            },
            {
              type: 'React.Select.Option',
              props: {
                value: 'b',
              },
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'B',
                  },
                },
              ],
            },
            {
              type: 'React.Select.Option',
              props: {
                value: 'c',
              },
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'C',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'React.Form.Item',
      props: {
        label: 'Username',
        name: ['user', 'username'],
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
        label: 'Email',
        name: ['user', 'email'],
      },
      children: [
        {
          type: 'React.Input',
        },
      ],
    },
    {
      type: 'React.Form.List',
      props: {
        name: 'fields',
        label: 'Fields',
      },
      children: [
        {
          type: 'React.Form.Item',
          props: {
            name: 'name',
            label: 'Name',
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
            name: 'type',
            label: 'Type',
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
            type: 'React.primary',
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
