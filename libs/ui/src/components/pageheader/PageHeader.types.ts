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

export type PageHeaderProps = PropsFromKeys<typeof pageHeaderPropKeys[number]>
