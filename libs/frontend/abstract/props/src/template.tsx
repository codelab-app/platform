import { JSXElementConstructor } from 'react'

export interface DashboardTemplateProps {
  Header?: JSXElementConstructor<any>
  MetaPane?: JSXElementConstructor<any>
  MainPane?: JSXElementConstructor<any>
  SidebarNavigation?: JSXElementConstructor<any>
  headerHeight?: number
}

export interface BuilderDashboardTemplateProps {
  Header?: JSXElementConstructor<any>
  MetaPane?: JSXElementConstructor<any>
  MainPane?: JSXElementConstructor<any>
  SidebarNavigation?: JSXElementConstructor<any>
  headerHeight?: number
  // style for the content layout
  contentStyles?: React.CSSProperties
}
