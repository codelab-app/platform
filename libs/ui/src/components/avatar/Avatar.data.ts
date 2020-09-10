import { ReactNodeI } from '@codelab/shared/interface/node'
import { AvatarProps } from './Avatar.types'

export const avatarData: ReactNodeI<AvatarProps> = {
  type: 'Avatar',
  nodeType: 'React',
  props: {
    shape: 'circle',
    size: 'default',
    icon: {
      type: 'Icon',
      nodeType: 'React',
      props: {
        type: 'user',
        theme: 'outlined',
      },
    },
  },
}
