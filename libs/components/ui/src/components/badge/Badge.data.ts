import { Badge } from './Badge.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const badgeData: NodeReactI<Badge.Props> = {
  type: 'React.Badge',
  props: {
    count: 5,
  },
}
