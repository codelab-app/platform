import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'

export const pageHeaderPropKeys = [
  'title',
  'subTitle',
  'ghost',
  'avatar',
  'backIcon',
  'tags',
  'extra',
  'breadcrumb',
  'footer',
  'onBack',
]

type PageHeaderProps = PropsFromKeys<typeof pageHeaderPropKeys[number]>

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
