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
  ] as const

  export const gridPropKeys = ['className', 'hoverable', 'style'] as const

  export const metaPropKeys = [
    'avatar',
    'className',
    'description',
    'style',
    'title',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type GridProps = PropsFromKeys<typeof gridPropKeys[number]>

  export type MetaProps = PropsFromKeys<typeof metaPropKeys[number]>
}
