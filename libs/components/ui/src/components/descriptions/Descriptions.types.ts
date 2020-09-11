import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Descriptions {
  export const propKeys = [
    'title',
    'extra',
    'bordered',
    'column',
    'size',
    'layout',
    'colon',
  ] as const

  export const itemPropKeys = ['label', 'span'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>
}
