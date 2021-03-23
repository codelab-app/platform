import { AtomType, NodeI } from '@codelab/frontend'

export const spinData: NodeI = {
  type: AtomType.ReactSpin,
  props: {
    size: 'default',
    spinning: 'true',
    tip: 'Loading',
  },
}
