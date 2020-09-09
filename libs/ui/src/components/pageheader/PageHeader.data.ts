import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/shared/interface'

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
