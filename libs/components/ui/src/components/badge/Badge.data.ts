import { ReactNodeI } from '@codelab/shared/interface/node'
import { Badge } from './Badge.types'

export const badgeData: ReactNodeI<Badge.Props> = {
  type: 'Badge',
  nodeType: 'React',
  props: {
    count: 5,
  },
}
