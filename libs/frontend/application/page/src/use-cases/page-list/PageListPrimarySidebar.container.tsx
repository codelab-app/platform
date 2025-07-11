'use client'

import type { IAppModel } from '@codelab/frontend-abstract-domain'

import { AppConnector } from '@codelab/frontend-infra-connector'

import { PageListPrimarySidebar } from './PageListPrimarySidebar'

export const PageListPrimarySidebarContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
  return (
    <AppConnector id={appId}>
      {(app: IAppModel) => <PageListPrimarySidebar app={app} pageId={pageId} />}
    </AppConnector>
  )
}
