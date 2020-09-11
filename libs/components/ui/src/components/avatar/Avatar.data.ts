import { ReactNodeI } from '@codelab/shared/interface/node'
import { Avatar } from './Avatar.types'
import { Icon } from '../icon'

export const avatarData: ReactNodeI<Avatar.Props | Icon.Props> = {
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
