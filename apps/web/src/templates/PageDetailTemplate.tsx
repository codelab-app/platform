import { EditorProvider } from '@codelab/frontend/builder'
import { AppProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { LayoutComponent } from './Layout.interface'

export const PageDetailTemplate: LayoutComponent<'builder'> = (props) => {
  const { children, MainPane, MetaPane } = props
  const router = useRouter()

  return (
    <AppProvider appId={router.query.appId as string}>
      <EditorProvider>
        <DashboardLayout
          MainPane={MainPane}
          MetaPane={MetaPane}
          SidebarNavigation={() => <></>}
        >
          {children}
        </DashboardLayout>
      </EditorProvider>
    </AppProvider>
  )
}
