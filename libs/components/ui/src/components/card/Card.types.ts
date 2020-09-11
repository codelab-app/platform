import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Card {
  export const propKeys = [
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

  export const gridPropKeys = ['className', 'hoverable', 'style']

  export const metaPropKeys = [
    'avatar',
    'className',
    'description',
    'style',
    'title',
  ]

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type GridProps = PropsFromKeys<typeof gridPropKeys[number]>

  export type MetaProps = PropsFromKeys<typeof metaPropKeys[number]>
}
