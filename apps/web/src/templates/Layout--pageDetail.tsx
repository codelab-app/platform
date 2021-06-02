import { EditorProvider } from '@codelab/frontend/builder'
import React from 'react'
import { DashboardLayout } from './DashboardLayout'
import { NextPageLayout } from './Layout.d'

export const LayoutPageDetail = (props: NextPageLayout<'builder'>) => {
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
