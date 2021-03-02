import { Editor } from '@craftjs/core'
import { WithRouterProps } from 'next/dist/client/with-router'
import React, { PropsWithChildren } from 'react'
import { Builder } from '../pages/builder/Builder'
import { HomeLayout } from '../pages/home'
import { AppProvider } from '../useCases/apps/AppProvider'
import { Dashboard } from './Dashboard'
import { PageType, elementTypeMap } from '@codelab/frontend'

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
        <Editor
          resolver={elementTypeMap}
          enabled
          // onRender={RenderNode}
        >
          <Builder>{children}</Builder>
        </Editor>
      </AppProvider>
    )
  }

  return <>{children}</>
}
