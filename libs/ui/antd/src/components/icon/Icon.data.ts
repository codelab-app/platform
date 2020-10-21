import { Icon } from './Icon.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const iconData: NodeReactI<Icon.Props> = {
  type: NodeType.React_Icon,
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
