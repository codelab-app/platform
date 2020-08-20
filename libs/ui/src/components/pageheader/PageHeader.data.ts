import { ReactNodeI } from '@codelab/graph'
import { PageHeaderProps } from './PageHeader.types'

export const pageHeaderData: ReactNodeI<PageHeaderProps> = {
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
