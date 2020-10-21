import { Icon } from '../icon'
import { Avatar } from './Avatar.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const avatarData: NodeReactI<Avatar.Props | Icon.Props> = {
  type: NodeType.React_Avatar,
  props: {
    shape: 'circle',
    size: 'default',
    icon: {
      type: NodeType.React_Icon,
      props: {
        type: 'user',
        theme: 'outlined',
      },
    },
  },
}
