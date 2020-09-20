import { Icon } from './Icon.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const iconData: NodeReactDtoI<Icon.Props> = {
  type: 'React.Icon',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
