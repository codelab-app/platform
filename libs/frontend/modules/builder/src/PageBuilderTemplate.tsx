import { LayoutComponent } from '@codelab/frontend/abstract/props'
import { DashboardLayout } from '@codelab/frontend/view/templates'
import React from 'react'
import { EditorProvider } from './EditorProvider'

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
