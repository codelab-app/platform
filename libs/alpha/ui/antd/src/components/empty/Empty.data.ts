import { Empty } from './Empty.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const emptyData: NodeReactI<Empty.Props> = {
  type: NodeType.React_Empty,
  props: {
    description: 'No Data',
  },
}
