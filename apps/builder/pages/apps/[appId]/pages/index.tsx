import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/domain/app'
import { ExplorerPanePage } from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Pages: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { appService } = useStore()
  const { app } = useCurrentApp(appService)

  return (
    <>
      <Head>
        <title>{app?.name ? `${app.name} | ` : ''} Pages | Codelab</title>
      </Head>
    </>
  )
})

export default Pages

export const getServerSideProps = auth0Instance.withPageAuthRequired()

Pages.Layout = observer((page) => {
  const { domainService, pageService, userService } = useStore()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      ExplorerPane={() => (
        <ExplorerPanePage
          domainService={domainService}
          pageService={pageService}
          userService={userService}
        />
      )}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {page.children}
    </DashboardTemplate>
  )
})
