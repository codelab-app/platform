import { WithRouterProps } from 'next/dist/client/with-router'
import React, { PropsWithChildren } from 'react'
import { Editor } from '@codelab/frontend/builder'
import { AppProvider, PageType } from '@codelab/frontend/shared'
import { HomeLayout } from './home'
import { Dashboard } from './Layout-dashboard'
import { Builder } from './Builder'
import { ComponentProvider } from '@codelab/frontend/shared'

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
        <Editor>
          <Builder>{children}</Builder>
        </Editor>
      </AppProvider>
    )
  }

  if (pathname === PageType.ComponentDetail) {
    const componentId = `${query.componentId}`

    return (
      <ComponentProvider componentId={componentId}>
        <Editor>
          <Builder>{children}</Builder>
        </Editor>
      </ComponentProvider>
    )
  }

  return <>{children}</>
}
