import { JSXElementConstructor } from 'react'

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
   * The bottom panel used for workflow & editors
   */
  EditorPane?: JSXElementConstructor<unknown>
  /**
   * The vertical icon only menu
   */
  SidebarNavigation?: JSXElementConstructor<unknown>
  headerHeight?: number
  contentStyles?: React.CSSProperties
}
