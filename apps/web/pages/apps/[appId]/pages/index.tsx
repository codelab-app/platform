import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import { PageMainPane } from '@codelab/frontend/modules/page'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Pages: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const { app } = useCurrentApp(store.apps)

  return (
    <>
      <Head>
        <title>Pages | {app?.name} | Codelab</title>
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
      MainPane={() => <PageMainPane pages={store.pages} />}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})
