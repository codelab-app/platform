import { NodeReactI } from '@codelab/shared/interface/node'

export const formLabel: NodeReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'Label',
    name: 'label',
  },
  children: [
    {
      type: 'React.Input',
    },
  ],
}
