'use client'

import type { ExplorerPaneType } from '@codelab/frontend/abstract/types'

import { PageConnector } from '@codelab/frontend-application-page/views'
import { AppConnector } from '@codelab/frontend-domain-app/store'

import { PagePrimarySidebar } from './PagePrimarySidebar'

export const PagePrimarySidebarContainer = ({
  appId,
  pageId,
  type,
}: {
  appId: string
  pageId: string
  type?: ExplorerPaneType
}) => {
  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => <PagePrimarySidebar app={app} page={page} type={type} />}
        </PageConnector>
      )}
    </AppConnector>
  )
}

PagePrimarySidebarContainer.displayName = 'PagePrimarySidebarContainer'
