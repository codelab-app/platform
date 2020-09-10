import { ReactNodeI } from '@codelab/shared/interface/node'
import { IconProps } from './Icon.types'

export const iconData: ReactNodeI<IconProps> = {
  type: 'Icon',
  nodeType: 'React',
  props: {
    type: 'home',
    theme: 'outlined',
    style: { fontSize: '24px' },
  },
}
