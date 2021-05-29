import { EditorProvider } from '@codelab/frontend/builder'
import { AppPageProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardLayout } from './DashboardLayout'
import { NextPageLayout } from './Layout.d'

export const LayoutPageDetail = (props: NextPageLayout<'builder'>) => {
  const { children, MainPane } = props
  const { query } = useRouter()
  const appId = `${query.appId}`
  const pageId = `${query.pageId}`

  if (!appId) {
    throw new Error('Missing "appId"')
  }

  if (!pageId) {
    throw new Error('Missing "pageId"')
  }

  return (
    <AppPageProvider appId={appId} pageId={pageId}>
      <EditorProvider>
        <DashboardLayout MainPane={MainPane}>{children}</DashboardLayout>
      </EditorProvider>
    </AppPageProvider>
  )
}
