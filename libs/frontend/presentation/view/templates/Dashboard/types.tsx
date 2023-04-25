import type { MenuProps } from 'antd'
import type { JSXElementConstructor } from 'react'

export type DashboardTemplateProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: JSXElementConstructor<unknown>
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  ExplorerPane?: JSXElementConstructor<unknown>
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
