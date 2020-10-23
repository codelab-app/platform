import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const formDefaultData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: NodeType.React_Form,
  props: {
    name: 'basic',
    initialValues: { select: 'a' },
    onFinish: {
      __type: [PropType.Eval],
      value: `
        console.log(this);
        return () => console.log("good");
      `,
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'ID',
        name: 'id',
      },
      children: [
        {
          type: NodeType.React_Input,
          props: {},
        },
      ],
    },
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'Checkbox',
        name: 'checkbox',
        valuePropName: 'checked',
      },
      children: [
        {
          type: NodeType.React_Checkbox,
        },
      ],
    },
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'Select',
        name: 'select',
      },
      children: [
        {
          type: NodeType.React_Select,
          props: {
            style: {
              width: 120,
            },
          },
          children: [
            {
              type: NodeType.React_Select_Option,
              props: {
                value: 'a',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'A',
                  },
                },
              ],
            },
            {
              type: NodeType.React_Select_Option,
              props: {
                value: 'b',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'B',
                  },
                },
              ],
            },
            {
              type: NodeType.React_Select_Option,
              props: {
                value: 'c',
              },
              children: [
                {
                  type: NodeType.React_Text,
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
      type: NodeType.React_Form_Item,
      props: {
        label: 'Username',
        name: ['user', 'username'],
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
        label: 'Email',
        name: ['user', 'email'],
      },
      children: [
        {
          type: NodeType.React_Input,
        },
      ],
    },
    {
      type: NodeType.React_Form_List,
      props: {
        name: 'fields',
        label: 'Fields',
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'name',
            label: 'Name',
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
            name: 'type',
            label: 'Type',
          },
          children: [
            {
              type: NodeType.React_Input,
            },
          ],
        },
      ],
    },
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
