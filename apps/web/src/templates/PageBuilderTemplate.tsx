import { EditorProvider } from '@codelab/frontend/builder'
import React from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { LayoutComponent } from './Layout.interface'

// Page Builder Template
export const PageBuilderTemplate: LayoutComponent<'builder'> = (props) => {
  const { children, Header, MainPane, MetaPane } = props

  return (
    <EditorProvider>
      <DashboardLayout
        Header={Header}
        MainPane={MainPane}
        MetaPane={MetaPane}
        SidebarNavigation={() => <></>}
      >
        {children}
      </DashboardLayout>
    </EditorProvider>
  )
}
