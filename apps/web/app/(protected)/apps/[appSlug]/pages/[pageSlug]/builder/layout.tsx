import { ConfigPaneInspectorTabContainer } from '@codelab/frontend-application-builder/sections'
import { ElementCssEditor } from '@codelab/frontend-presentation-components-css-editor'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      ConfigPane={
      <ConfigPaneInspectorTabContainer ElementCssEditor={<ElementCssEditor/>}}
    ></DashboardTemplate>
  )
}

export default Layout
