import {
  NodeReactI,
  NodeType,
  ReactTypeEnum,
} from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'
import { CodelabForm } from '@codelab/ui/antd'

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
      options: Object.entries(ReactTypeEnum),
    }),
  ],
}
