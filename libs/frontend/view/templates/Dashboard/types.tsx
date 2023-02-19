import type { MenuProps } from 'antd'
import type { JSXElementConstructor } from 'react'

export interface DashboardTemplateProps {
  Header?: JSXElementConstructor<unknown>
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  ExplorerPane?: JSXElementConstructor<unknown>
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: JSXElementConstructor<unknown>
  /**
   * The vertical icon only menu
   */
  sidebarNavigation?: {
    primaryItems: MenuProps['items']
    secondaryItems: MenuProps['items']
  }
  headerHeight?: number
  contentStyles?: React.CSSProperties
}
