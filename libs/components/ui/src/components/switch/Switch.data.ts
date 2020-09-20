import { Switch } from './Switch.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const switchData: NodeDtoReactI<Switch.Props> = {
  type: 'React.Switch',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
