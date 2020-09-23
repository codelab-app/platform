import { Switch } from './Switch.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const switchData: NodeReactI<Switch.Props> = {
  type: 'React.Switch',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
