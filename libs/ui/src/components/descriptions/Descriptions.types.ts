import { PropsFromKeys } from '@codelab/props'

export const descriptionsPropKeys = [
  'title',
  'extra',
  'bordered',
  'column',
  'size',
  'layout',
  'colon',
] as const

export const descriptionItemPropKeys = ['label', 'span'] as const

export type DescriptionProps = PropsFromKeys<
  typeof descriptionsPropKeys[number]
>

export type DescriptionItemProps = PropsFromKeys<
  typeof descriptionItemPropKeys[number]
>
