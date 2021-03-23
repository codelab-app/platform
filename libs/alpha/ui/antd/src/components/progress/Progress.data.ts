import { AtomType, NodeI } from '@codelab/frontend'

export const progressData: NodeI = {
  type: AtomType.ReactProgress,
  props: {
    type: 'line',
    percent: 30,
    showInfo: 'true',
    strokeLinecap: 'round',
  },
}
