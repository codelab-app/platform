import { Icon } from './Icon.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const iconData: NodeReactI<Icon.Props> = {
  type: 'React.Icon',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
