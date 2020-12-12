import { Badge } from './Badge.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const badgeData: NodeReactI<Badge.Props> = {
  type: NodeType.React_Badge,
  props: {
    count: 5,
  },
}
