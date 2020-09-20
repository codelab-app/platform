import { Icon } from './Icon.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const iconData: NodeDtoReactI<Icon.Props> = {
  type: 'React.Icon',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
