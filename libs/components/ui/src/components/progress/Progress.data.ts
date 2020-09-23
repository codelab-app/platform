import { Progress } from './Progress.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const progressData: NodeReactI<Progress.Props> = {
  type: 'React.Progress',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
