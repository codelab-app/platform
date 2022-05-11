import { JSXElementConstructor } from 'react'

export interface DashboardTemplateProps {
  Header?: JSXElementConstructor<unknown>
  MetaPane?: JSXElementConstructor<unknown>
  MainPane?: JSXElementConstructor<unknown>
  SidebarNavigation?: JSXElementConstructor<unknown>
  headerHeight?: number
}

export interface BuilderDashboardTemplateProps {
  Header?: JSXElementConstructor<unknown>
  MetaPane?: JSXElementConstructor<unknown>
  MainPane?: JSXElementConstructor<unknown>
  SidebarNavigation?: JSXElementConstructor<unknown>
  headerHeight?: number
  // style for the content layout
  contentStyles?: React.CSSProperties
}
