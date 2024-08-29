import type { JSXElementConstructor } from 'react'
import type React from 'react'

export interface PrimarySidebarItem {
  key: React.Key
  render: React.ReactElement
}

export interface PrimarySidebar {
  default?: React.Key
  items: Array<PrimarySidebarItem>
}

export type DashboardTemplateProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: React.ReactElement
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  PrimarySidebar?: PrimarySidebar
  Header?: React.ReactElement
  contentStyles?: React.CSSProperties
  appId?: string
  componentId?: string
  pageId?: string
}
