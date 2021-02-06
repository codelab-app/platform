import { WithRouterProps } from 'next/dist/client/with-router'
import React, { PropsWithChildren } from 'react'
import { Builder } from '../builder/Builder'
import { HomeLayout } from '../home'
import { AppProvider } from '../useCases/apps/AppProvider'
import { Dashboard } from './Dashboard'
import { PageType } from '@codelab/frontend'

export const LayoutFactory = ({
  children,
  router,
}: PropsWithChildren<WithRouterProps>) => {
  const { pathname, query } = router

  if (pathname === PageType.Home) {
    return <HomeLayout>{children}</HomeLayout>
  }

  if (pathname === PageType.AppList) {
    return <Dashboard>{children}</Dashboard>
  }

  if (pathname === PageType.PageDetail) {
    const appId = `${query.appId}`
    const pageId = `${query.pageId}`

    return (
      <AppProvider appId={appId} pageId={pageId}>
        <Builder>{children}</Builder>
      </AppProvider>
    )
  }

  return <div>No Layout Found!</div>
}
