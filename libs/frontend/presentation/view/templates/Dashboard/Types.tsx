import type { MenuProps } from 'antd'
import type { JSXElementConstructor } from 'react'

export interface PaneItem {
  key: React.Key
  render: JSXElementConstructor<unknown>
}

export interface ExplorerPane {
  default?: React.Key
  items: Array<PaneItem>
}

export type DashboardTemplateProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: JSXElementConstructor<unknown>
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  ExplorerPane?: ExplorerPane
  Header?: JSXElementConstructor<unknown>
  contentStyles?: React.CSSProperties
  headerHeight?: number
  /**
   * The vertical icon only menu
   */
  sidebarNavigation?: {
    primaryItems: MenuProps['items']
    secondaryItems: MenuProps['items']
  }
}
