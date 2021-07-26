import { EditorProvider } from '@codelab/frontend/builder'
import React from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { LayoutComponent } from './Layout.interface'

export const PageDetailTemplate: LayoutComponent<'builder'> = (props) => {
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
