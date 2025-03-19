'use client'

import type { ExplorerPaneType } from '@codelab/frontend/abstract/types'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { PageConnector } from '@codelab/frontend-application-page/views'

import { PageBuilderPrimarySidebar } from './PageBuilderPrimarySidebar'

export const PageBuilderPrimarySidebarContainer = ({
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
          {(page) => (
            <PageBuilderPrimarySidebar app={app} page={page} paneType={type} />
          )}
        </PageConnector>
      )}
    </AppConnector>
  )
}

PageBuilderPrimarySidebarContainer.displayName = 'PagePrimarySidebarContainer'
