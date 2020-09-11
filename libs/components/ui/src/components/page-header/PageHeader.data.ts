import { ReactNodeI } from '@codelab/shared/interface/node'
import { PageHeader } from './PageHeader.types'

export const pageHeaderData: ReactNodeI<PageHeader.Props> = {
  type: 'PageHeader',
  nodeType: 'React',
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
