'use client'

import type { IPageBuilderRoute } from '@codelab/frontend/abstract/application'

import { AppConnector, PageConnector } from '@codelab/frontend/infra/connector'

import { PageBuilderPrimarySidebar } from './PageBuilderPrimarySidebar'

export const PageBuilderPrimarySidebarContainer = ({
  context,
}: {
  context: IPageBuilderRoute
}) => {
  const {
    params: { appId, pageId },
  } = context

  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => (
            <PageBuilderPrimarySidebar
              app={app}
              context={context}
              page={page}
            />
          )}
        </PageConnector>
      )}
    </AppConnector>
  )
}

PageBuilderPrimarySidebarContainer.displayName = 'PagePrimarySidebarContainer'
