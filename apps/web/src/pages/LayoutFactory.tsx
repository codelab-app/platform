import { WithRouterProps } from 'next/dist/client/with-router'
import React, { PropsWithChildren } from 'react'
// import { Builder, Editor } from '@codelab/frontend/builder'
import { AppProvider, PageType } from '@codelab/frontend/shared'
import { HomeLayout } from './home/Home-layout'
import { Dashboard } from './Layout-dashboard'

// const RenderNode = ({ element }: any) => {
//   return <div style={{ background: '#000', padding: '5px' }}>{element}</div>
// }

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
        {/* <Editor pageId={pageId}>
          <Builder>{children}</Builder>
        </Editor> */}
      </AppProvider>
    )
  }

  return <>{children}</>
}
