import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Breadcrumb {
  export const propKeys = [
    'itemRender',
    'params',
    'routes',
    'separator',
  ] as const

  export const itemPropKeys = [
    'dropdownProps',
    'href',
    'overlay',
    'onClick',
  ] as const

  export const separatorPropKeys = ['children'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

  export type SeparatorProps = PropsFromKeys<typeof separatorPropKeys[number]>
}
