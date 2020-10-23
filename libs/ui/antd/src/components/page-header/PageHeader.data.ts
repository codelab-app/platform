import { PageHeader } from './PageHeader.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const pageHeaderData: NodeReactI<PageHeader.Props> = {
  type: NodeType.React_PageHeader,
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
