import { Switch } from './Switch.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const switchData: NodeReactDtoI<Switch.Props> = {
  type: 'React.Switch',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
