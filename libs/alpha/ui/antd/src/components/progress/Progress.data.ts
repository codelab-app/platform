import { Progress } from './Progress.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const progressData: NodeReactI<Progress.Props> = {
  type: NodeType.React_Progress,
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
