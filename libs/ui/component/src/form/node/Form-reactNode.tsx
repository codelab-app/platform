import { NodeReactI, NodeType, ReactType } from '@codelab/shared/interface/node'
import { CodelabForm } from '@codelab/ui/antd'

export const reactNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "React"',
    },
  },
  children: [
    CodelabForm.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(ReactType),
    }),
  ],
}
