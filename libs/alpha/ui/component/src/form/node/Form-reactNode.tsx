import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'
import { CodelabForm } from '@codelab/alpha/ui/antd'

const reactType = Object.entries(NodeType).filter(([key, value]) =>
  value.includes('React_'),
)

export const reactNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: [PropType.Eval],
      value: 'return (values) => values.nodeType !== "React"',
    },
  },
  children: [
    CodelabForm.createSelect({
      label: 'Type',
      name: 'type',
      options: reactType,
      showSearch: true,
      filterOption: {
        __type: [PropType.Eval],
        value:
          'return (input, option) => option.children.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0',
      },
    }),
  ],
}
