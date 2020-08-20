import { ReactNodeI } from '@codelab/graph'
import { BadgeProps } from './Badge.types'

export const badgeData: ReactNodeI<BadgeProps> = {
  type: 'Badge',
  nodeType: 'React',
  props: {
    count: 5,
  },
}
