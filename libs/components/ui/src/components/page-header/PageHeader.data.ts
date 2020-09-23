import { PageHeader } from './PageHeader.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const pageHeaderData: NodeReactI<PageHeader.Props> = {
  type: 'React.PageHeader',
  props: {
    title: 'Title',
    subTitle: 'This is a subtitle',
    onBack: {
      __type: 'eval',
      value: 'return () => null',
    },
    style: { border: ' 1px solid rgb(235, 237, 240)' },
  },
}
