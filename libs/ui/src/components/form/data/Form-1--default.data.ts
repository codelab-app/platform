import { ReactNodeI } from '@codelab/node'
import { ButtonProps } from '../../button'
import { FormItemProps, FormProps } from '../Form.types'
import { TextProps } from '../../text/Text.types'

export const formDefaultData: ReactNodeI<
  FormProps | FormItemProps | TextProps | ButtonProps
> = {
  type: 'Form',
  nodeType: 'React',
  props: {
    ctx: { eval: true, value: '' },
    name: 'basic',
    initialValues: { select: 'a' },
    onFinish: '() => console.log("good")',
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'ID',
        name: 'id',
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
          props: {},
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Checkbox',
        name: 'checkbox',
        valuePropName: 'checked',
      },
      children: [
        {
          type: 'Checkbox',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Select',
        name: 'select',
      },
      children: [
        {
          type: 'Select',
          nodeType: 'React',
          props: {
            style: {
              width: 120,
            },
          },
          children: [
            {
              type: 'Select.Option',
              nodeType: 'React',
              props: {
                value: 'a',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'A',
                  },
                },
              ],
            },
            {
              type: 'Select.Option',
              nodeType: 'React',
              props: {
                value: 'b',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'B',
                  },
                },
              ],
            },
            {
              type: 'Select.Option',
              nodeType: 'React',
              props: {
                value: 'c',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
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
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Username',
        name: ['user', 'username'],
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Email',
        name: ['user', 'email'],
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Form.List',
      nodeType: 'React',
      props: {
        name: 'fields',
        label: 'Fields',
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            name: 'name',
            label: 'Name',
          },
          children: [
            {
              type: 'Input',
              nodeType: 'React',
            },
          ],
        },
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            name: 'type',
            label: 'Type',
          },
          children: [
            {
              type: 'Input',
              nodeType: 'React',
            },
          ],
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      children: [
        {
          type: 'Button',
          nodeType: 'React',
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
