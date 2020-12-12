import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace List {
  export const propKeys = [
    'bordered',
    'footer',
    'grid',
    'header',
    'itemLayout',
    'rowKey',
    'loading',
    'loadMore',
    'locale',
    'pagination',
    'size',
    'split',
    'dataSource',
    'renderItem',
  ] as const

  export const paginationPropKeys = ['position'] as const

  export const gridPropKeys = [
    'column',
    'gutter',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
  ] as const

  export const itemPropKeys = ['actions', 'extra'] as const

  export const metaPropKeys = ['avatar', 'description', 'title'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type PaginationProps = PropsFromKeys<typeof paginationPropKeys[number]>

  export type GridProps = PropsFromKeys<typeof gridPropKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

  export type ItemMetaProps = PropsFromKeys<typeof metaPropKeys[number]>
}
