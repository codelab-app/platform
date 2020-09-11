import { ReactNodeI } from '@codelab/shared/interface/node'
import { Switch } from './Switch.types'

export const switchData: ReactNodeI<Switch.Props> = {
  type: 'Switch',
  nodeType: 'React',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
