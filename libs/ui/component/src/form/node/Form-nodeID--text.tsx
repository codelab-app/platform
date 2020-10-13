import { NodeReactI } from '@codelab/shared/interface/node'

export const nodeID: NodeReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'ID',
    name: 'id',
  },
  children: [
    {
      type: 'React.Input',
      props: { disabled: true },
    },
  ],
}
