import { PropsFromKeys } from '@codelab/shared/interface'

export const cardPropKeys = [
  'actions',
  'activeTabKey',
  'headStyle',
  'bodyStyle',
  'bordered',
  'cover',
  'defaultActiveTabKey',
  'extra',
  'hoverable',
  'loading',
  'tabList',
  'tabBarExtraContent',
  'size',
  'title',
  'type',
  'onTabChange',
  'tabProps',
]

export const cardGridPropKeys = ['className', 'hoverable', 'style']

export const cardMetaPropKeys = [
  'avatar',
  'className',
  'description',
  'style',
  'title',
]

export type CardProps = PropsFromKeys<typeof cardPropKeys[number]>

export type CardGridProps = PropsFromKeys<typeof cardGridPropKeys[number]>

export type CardMetaProps = PropsFromKeys<typeof cardMetaPropKeys[number]>
