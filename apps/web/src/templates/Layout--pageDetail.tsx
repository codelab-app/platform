import { EditorProvider } from '@codelab/frontend/builder'
import React from 'react'
import { DashboardLayout } from './DashboardLayout'
import { LayoutComponent } from './Layout.d'

export const LayoutPageDetail: LayoutComponent<'builder'> = (props) => {
  const { children, MainPane, MetaPane } = props

  return (
    <EditorProvider>
      <DashboardLayout
        MainPane={MainPane}
        MetaPane={MetaPane}
        SidebarNavigation={() => <></>}
      >
        {children}
      </DashboardLayout>
    </EditorProvider>
  )
}
