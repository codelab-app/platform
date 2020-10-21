import { Rate } from './Rate.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const rateData: NodeReactI<Rate.Props> = {
  type: NodeType.React_Rate,
  props: {
    defaultValue: 2,
  },
}
