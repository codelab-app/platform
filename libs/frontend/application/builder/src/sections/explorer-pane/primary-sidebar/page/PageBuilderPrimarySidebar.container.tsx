'use client'

import { AppConnector, PageConnector } from '@codelab/frontend/infra/connector'

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
