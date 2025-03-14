'use client'

import type { ExplorerPaneType } from '@codelab/frontend/abstract/types'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { PagePrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { observer } from 'mobx-react-lite'

export const PagePrimarySidebarContainer = observer(
  ({
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
  },
)
