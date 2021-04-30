import { EditorProvider } from '@codelab/frontend/builder'
import { AppProvider } from '@codelab/frontend/shared'
import { NextPageLayout } from 'apps/web/pages/_app'
import { useRouter } from 'next/router'
import React from 'react'
import { LayoutBuilder } from './Layout--builder'

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
    <AppProvider appId={appId} pageId={pageId}>
      <EditorProvider>
        <LayoutBuilder MainPane={MainPane}>{children}</LayoutBuilder>
      </EditorProvider>
    </AppProvider>
  )
}
