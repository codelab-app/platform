import { Badge } from './Badge.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const badgeData: NodeDtoI<Badge.Props> = {
  type: 'React.Badge',
  props: {
    count: 5,
  },
}
