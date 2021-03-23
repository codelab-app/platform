import { AtomType, NodeI } from '@codelab/frontend'

export const avatarData: NodeI = {
  type: AtomType.ReactAvatar,
  props: {
    shape: 'circle',
    size: 'default',
    icon: {
      type: AtomType.ReactIcon,
      props: {
        type: 'user',
        theme: 'outlined',
      },
    },
  },
}
