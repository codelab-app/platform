import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import { ExplorerPanePage } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  appMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Pages: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const { app } = useCurrentApp(store.appService)

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
  const store = useStore()
  const appId = useCurrentAppId()

  return (
    <DashboardTemplate
      ExplorerPane={() => <ExplorerPanePage pageService={store.pageService} />}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem, storeMenuItem(appId)]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
})
