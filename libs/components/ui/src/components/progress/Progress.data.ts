import { Progress } from './Progress.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const progressData: NodeDtoReactI<Progress.Props> = {
  type: 'React.Progress',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
