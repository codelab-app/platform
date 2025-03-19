'use client'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { PageConnector } from '@codelab/frontend-application-page/views'

import { PageBuilderPrimarySidebar } from './PageBuilderPrimarySidebar'

export const PageBuilderPrimarySidebarContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => <PageBuilderPrimarySidebar app={app} page={page} />}
        </PageConnector>
      )}
    </AppConnector>
  )
}

PageBuilderPrimarySidebarContainer.displayName = 'PagePrimarySidebarContainer'
