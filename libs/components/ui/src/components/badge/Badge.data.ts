import { ReactNodeI } from '@codelab/shared/interface/node'
import { BadgeProps } from './Badge.types'

export const badgeData: ReactNodeI<BadgeProps> = {
  type: 'Badge',
  nodeType: 'React',
  props: {
    count: 5,
  },
}
