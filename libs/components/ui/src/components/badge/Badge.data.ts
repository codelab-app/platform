import { Badge } from './Badge.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const badgeData: NodeReactDtoI<Badge.Props> = {
  type: 'React.Badge',
  props: {
    count: 5,
  },
}
