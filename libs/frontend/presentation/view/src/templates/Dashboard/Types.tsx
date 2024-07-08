import type { ComponentType, JSXElementConstructor } from 'react'
import type React from 'react'

export interface PrimarySidebarItem {
  key: React.Key
  render: ComponentType
}

export interface PrimarySidebar {
  default?: React.Key
  items: Array<PrimarySidebarItem>
}

export type DashboardTemplateProps<T = unknown> = T & {
  /**
   * The right panel used for configuration element settings
   */
  ConfigPane?: JSXElementConstructor<unknown>
  /**
   * The left panel used for navigating tree data, naming taken from VSCode's explorer pane
   */
  PrimarySidebar?: PrimarySidebar
  Header?: React.ReactElement
  contentStyles?: React.CSSProperties
  appSlug?: string
  componentSlug?: string
  pageSlug?: string
  userSlug?: string
}
