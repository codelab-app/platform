import { NodeReactI } from '@codelab/shared/interface/node'

export const parentNodeSelect: NodeReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'Parent',
    name: 'parent',
  },
  children: [
    {
      type: 'React.Select',
      props: {
        options: {
          __type: ['Eval'],
          value: 'return this.parentnodes ?? []',
        },
      },
    },
  ],
}
