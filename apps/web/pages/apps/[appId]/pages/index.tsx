import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import { PageMainPane } from '@codelab/frontend/modules/page'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  DashboardTemplate,
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

export const getServerSideProps = withPageAuthRequired()

Pages.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      MainPane={() => <PageMainPane pageService={store.pageService} />}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})
