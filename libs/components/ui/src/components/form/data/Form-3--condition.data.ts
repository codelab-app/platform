import { ReactNodeI } from '@codelab/shared/interface/node'
import { PropValue } from '@codelab/shared/interface/props'
import { Form } from '../Form.types'
import { Text } from '../../text'

export const formConditionData: ReactNodeI<
  Form.Props | Form.ItemProps | Text.Props | { shouldRender: PropValue }
> = {
  type: 'Form',
  nodeType: 'React',
  props: {
    // name: 'form',
    initialValues: {},
    onFinish: '',
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Select condition',
        name: 'nameOfSelect',
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
      type: 'Form.ItemHook',
      nodeType: 'React',
      props: {
        shouldUpdate: true,
        shouldRender: {
          eval: true,
          value: 'return (values) => values.nameOfSelect !== "a"',
        },
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            label: 'Field A',
            name: 'a',
          },
          children: [{ type: 'Input', nodeType: 'React', props: {} }],
        },
      ],
    },
    {
      type: 'Form.ItemHook',
      nodeType: 'React',
      props: {
        shouldUpdate: true,
        shouldRender: {
          eval: true,
          value: 'return (values) => values.nameOfSelect !== "b"',
        },
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            label: 'Field B',
            name: 'b',
          },
          children: [{ type: 'Input', nodeType: 'React', props: {} }],
        },
      ],
    },
    {
      type: 'Form.ItemHook',
      nodeType: 'React',
      props: {
        shouldUpdate: true,
        shouldRender: {
          eval: true,
          value: 'return (values) => values.nameOfSelect !== "c"',
        },
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            label: 'Field C',
            name: 'c',
          },
          children: [{ type: 'Input', nodeType: 'React', props: {} }],
        },
      ],
    },
  ],
}
