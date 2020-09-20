import { Progress } from './Progress.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const progressData: NodeReactDtoI<Progress.Props> = {
  type: 'React.Progress',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
