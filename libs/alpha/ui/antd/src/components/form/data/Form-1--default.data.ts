import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const formDefaultData: NodeI = {
  type: AtomType.ReactForm,
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
      type: AtomType.ReactFormItem,
      props: {
        label: 'ID',
        name: 'id',
      },
      children: [
        {
          type: AtomType.ReactInput,
          props: {},
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      props: {
        label: 'Checkbox',
        name: 'checkbox',
        valuePropName: 'checked',
      },
      children: [
        {
          type: AtomType.ReactCheckbox,
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      props: {
        label: 'Select',
        name: 'select',
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
      type: AtomType.ReactFormItem,
      props: {
        label: 'Username',
        name: ['user', 'username'],
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
        label: 'Email',
        name: ['user', 'email'],
      },
      children: [
        {
          type: AtomType.ReactInput,
        },
      ],
    },
    {
      type: AtomType.ReactFormList,
      props: {
        name: 'fields',
        label: 'Fields',
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            name: 'name',
            label: 'Name',
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
            name: 'type',
            label: 'Type',
          },
          children: [
            {
              type: AtomType.ReactInput,
            },
          ],
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      children: [
        {
          type: AtomType.ReactButton,
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: AtomType.ReactText,
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
