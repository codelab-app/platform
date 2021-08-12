import { LayoutComponent } from '@codelab/frontend/abstract/props'
import { EditorProvider } from '@codelab/frontend/modules/builder'
import { DashboardLayout } from '@codelab/frontend/view/templates'
import React from 'react'

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
