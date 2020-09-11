import { ReactNodeI } from '@codelab/shared/interface/node'
import { Progress } from './Progress.types'

export const progressData: ReactNodeI<Progress.Props> = {
  type: 'Progress',
  nodeType: 'React',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
