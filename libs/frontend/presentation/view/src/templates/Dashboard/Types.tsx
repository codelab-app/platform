import type React from 'react'

export interface PrimarySidebarItem {
  key: React.Key
  render: React.ReactElement
}

export interface PrimarySidebar {
  default?: React.Key
  items: Array<PrimarySidebarItem>
}

export type DashboardProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: React.ReactNode
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  PrimarySidebar?: React.ReactNode
  // PrimarySidebar?: PrimarySidebar
  primarySidebarKey?: string
  Header?: React.ReactNode
  Main?: React.ReactNode
  contentStyles?: React.CSSProperties
  SecondaryPopover?: React.ReactNode
  appId?: string
  componentId?: string
  pageId?: string
}
