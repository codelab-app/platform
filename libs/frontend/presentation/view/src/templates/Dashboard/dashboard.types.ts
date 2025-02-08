import type React from 'react'

export interface PrimarySidebarItem {
  key: React.Key
  render: React.ReactElement<unknown>
}

export interface PrimarySidebar {
  default?: React.Key
  items: Array<PrimarySidebarItem>
}

export type DashboardProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  configPane?: React.ReactNode
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  primarySidebar?: React.ReactNode
  primarySidebarKey?: string
  header?: React.ReactNode
  /**
   * Main area of the dashboard
   */
  main?: React.ReactNode
  contentStyles?: React.CSSProperties
  secondaryPopover?: React.ReactNode
  appId?: string
  componentId?: string
  pageId?: string

  /**
   * Optional modal to display
   */
  modal?: React.ReactNode
}
