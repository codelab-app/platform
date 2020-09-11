import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace PageHeader {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
