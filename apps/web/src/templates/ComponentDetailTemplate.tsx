import { EditorProvider } from '@codelab/frontend/modules/builder'
import React from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { LayoutComponent } from './Layout.interface'

export const ComponentDetailTemplate: LayoutComponent<'builder'> = (props) => {
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
