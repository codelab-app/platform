import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const pageHeaderData: NodeI = {
  type: AtomType.ReactPageHeader,
  props: {
    title: 'Title',
    subTitle: 'This is a subtitle',
    onBack: {
      __type: [PropType.Eval],
      value: 'return () => null',
    },
    style: { border: ' 1px solid rgb(235, 237, 240)' },
  },
}
