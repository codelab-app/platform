import { PropsFromKeys } from '@codelab/shared/interface'

export const tabsPropKeys = [
  'activeKey',
  'animated',
  'renderTabBar',
  'defaultActiveKey',
  'hideAdd',
  'size',
  'tabBarExtraContent',
  'tabBarGutter',
  'tabBarStyle',
  'tabPosition',
  'type',
  'onChange',
  'onEdit',
  'onTabClick',
] as const

export const tabPanePropKeys = [
  'forceRender',
  'key',
  'tab',
  'closeIcon',
  'disabled',
] as const

export type TabsProps = PropsFromKeys<typeof tabsPropKeys[number]>

export type TabPaneProps = PropsFromKeys<typeof tabPanePropKeys[number]>
