import { Badge } from './Badge.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const badgeData: NodeDtoReactI<Badge.Props> = {
  type: 'React.Badge',
  props: {
    count: 5,
  },
}
