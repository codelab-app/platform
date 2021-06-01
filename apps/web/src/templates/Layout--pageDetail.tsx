import { EditorProvider } from '@codelab/frontend/builder'
import { AppPageProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardLayout } from './DashboardLayout'
import { NextPageLayout } from './Layout.d'

export const LayoutPageDetail = (props: NextPageLayout<'builder'>) => {
  const { children, MainPane } = props

  return (
    <EditorProvider>
      <DashboardLayout MainPane={MainPane} SidebarNavigation={() => <></>}>
        {children}
      </DashboardLayout>
    </EditorProvider>
  )
}
