import { ReactNodeI } from '@codelab/shared/interface/node'
import { Icon } from './Icon.types'

export const iconData: ReactNodeI<Icon.Props> = {
  type: 'Icon',
  nodeType: 'React',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
