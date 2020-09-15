import { Progress } from './Progress.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const progressData: NodeDtoI<Progress.Props> = {
  type: 'React.Progress',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
