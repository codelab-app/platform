import { Switch } from './Switch.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const switchData: NodeDtoI<Switch.Props> = {
  type: 'React.Switch',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
