'use client'

import { AppConnector } from '@codelab/frontend-application-app/views'
import { PagePrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { observer } from 'mobx-react-lite'

export const PagePrimarySidebarContainer = observer(
  ({ appId, pageId }: { appId: string; pageId: string }) => {
    return (
      <AppConnector id={appId}>
        {(app) => (
          <PageConnector id={pageId}>
            {(page) => <PagePrimarySidebar app={app} page={page} />}
          </PageConnector>
        )}
      </AppConnector>
    )
  },
)
