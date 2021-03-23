import { AtomType, NodeI } from '@codelab/frontend'

export const inputNumberData: NodeI = {
  type: AtomType.ReactInputNumber,
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
