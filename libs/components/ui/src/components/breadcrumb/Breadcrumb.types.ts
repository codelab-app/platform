import { PropsFromKeys } from '@codelab/shared/interface/props'

export const breadcrumbPropKeys = [
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

export type BreadcrumbProps = PropsFromKeys<typeof breadcrumbPropKeys[number]>

export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

export type SeparatorProps = PropsFromKeys<typeof separatorPropKeys[number]>
