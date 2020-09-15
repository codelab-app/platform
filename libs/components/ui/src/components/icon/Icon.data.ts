import { Icon } from './Icon.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const iconData: NodeDtoI<Icon.Props> = {
  type: 'React.Icon',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
