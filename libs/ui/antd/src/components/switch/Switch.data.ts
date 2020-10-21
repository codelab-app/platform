import { Switch } from './Switch.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const switchData: NodeReactI<Switch.Props> = {
  type: NodeType.React_Switch,
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
