import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Tabs {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type TabPaneProps = PropsFromKeys<typeof tabPanePropKeys[number]>
}
