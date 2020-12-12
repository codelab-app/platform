import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType, PropTypeValue } from '@codelab/alpha/shared/interface/props'

export const formConditionData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | { shouldRender: PropTypeValue }
> = {
  type: NodeType.React_Form,
  props: {
    // name: 'form',
    initialValues: {},
    onFinish: '',
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'Select Type',
        name: 'select_type',
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
      type: NodeType.React_Form_ItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "a"',
        },
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            label: 'Field A',
            name: 'a',
          },
          children: [{ type: NodeType.React_Input, props: {} }],
        },
      ],
    },
    {
      type: NodeType.React_Form_ItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "b"',
        },
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            label: 'Field B',
            name: 'b',
          },
          children: [{ type: NodeType.React_Input, props: {} }],
        },
      ],
    },
    {
      type: NodeType.React_Form_ItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "c"',
        },
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            label: 'Field C',
            name: 'c',
          },
          children: [{ type: NodeType.React_Input, props: {} }],
        },
      ],
    },
  ],
}
