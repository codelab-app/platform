import { ReactNodeI } from '@codelab/graph'
import { ProgressProps } from './Progress.types'

export const progressData: ReactNodeI<ProgressProps> = {
  type: 'Progress',
  nodeType: 'React',
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
