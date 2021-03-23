import { AtomType, NodeI } from '@codelab/frontend'

export const switchData: NodeI = {
  type: AtomType.ReactSwitch,
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
