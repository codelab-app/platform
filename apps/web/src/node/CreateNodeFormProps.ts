import { ReactNodeI } from '@codelab/shared/interface/node'

export const CreateNodeFormProps: ReactNodeI = {
  type: 'Form.Item',
  nodeType: 'React',
  props: {
    label: 'Prop',
    name: 'prop',
  },
  children: [
    {
      type: 'Form.List',
      nodeType: 'React',
      props: {
        name: 'props',
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            name: 'name',
          },
          children: [
            {
              type: 'Input',
              nodeType: 'React',
              props: {
                placeholder: 'Name',
              },
            },
          ],
        },
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            name: 'type',
          },
          children: [
            {
              type: 'Input',
              nodeType: 'React',
              props: {
                placeholder: 'Type',
              },
            },
          ],
        },
      ],
    },
  ],
}
