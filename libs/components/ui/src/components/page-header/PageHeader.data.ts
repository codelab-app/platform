import { PageHeader } from './PageHeader.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const pageHeaderData: NodeDtoI<PageHeader.Props> = {
  type: 'React.PageHeader',
  props: {
    title: 'Title',
    subTitle: 'This is a subtitle',
    onBack: {
      eval: true,
      value: 'return () => null',
    },
    style: { border: ' 1px solid rgb(235, 237, 240)' },
  },
}
