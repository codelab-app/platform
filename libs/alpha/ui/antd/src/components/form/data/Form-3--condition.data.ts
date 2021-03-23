import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const formConditionData: NodeI = {
  type: AtomType.ReactForm,
  props: {
    // name: 'form',
    initialValues: {},
    onFinish: '',
  },
  children: [
    {
      type: AtomType.ReactFormItem,
      props: {
        label: 'Select Type',
        name: 'select_type',
      },
      children: [
        {
          type: AtomType.ReactSelect,
          props: {
            style: {
              width: 120,
            },
          },
          children: [
            {
              type: AtomType.ReactSelectOption,
              props: {
                value: 'a',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'A',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactSelectOption,
              props: {
                value: 'b',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'B',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactSelectOption,
              props: {
                value: 'c',
              },
              children: [
                {
                  type: AtomType.ReactText,
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
      type: AtomType.ReactFormItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "a"',
        },
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            label: 'Field A',
            name: 'a',
          },
          children: [{ type: AtomType.ReactInput, props: {} }],
        },
      ],
    },
    {
      type: AtomType.ReactFormItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "b"',
        },
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            label: 'Field B',
            name: 'b',
          },
          children: [{ type: AtomType.ReactInput, props: {} }],
        },
      ],
    },
    {
      type: AtomType.ReactFormItemHook,
      props: {
        shouldUpdate: true,
        shouldRender: {
          __type: [PropType.Eval],
          value: 'return (values) => values.select_type !== "c"',
        },
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            label: 'Field C',
            name: 'c',
          },
          children: [{ type: AtomType.ReactInput, props: {} }],
        },
      ],
    },
  ],
}
