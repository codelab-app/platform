import { Spin } from './Spin.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const spinData: NodeReactI<Spin.Props> = {
  type: NodeType.React_Spin,
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
