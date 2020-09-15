import { Icon } from '../icon'
import { Avatar } from './Avatar.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const avatarData: NodeDtoI<Avatar.Props | Icon.Props> = {
  type: 'React.Avatar',
  props: {
    shape: 'circle',
    size: 'default',
    icon: {
      type: 'React.Icon',
      props: {
        type: 'user',
        theme: 'outlined',
      },
    },
  },
}
