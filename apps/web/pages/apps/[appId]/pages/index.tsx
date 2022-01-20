import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
import { AppProvider, useAppState } from '@codelab/frontend/modules/app'
import { PageMainPane } from '@codelab/frontend/modules/page'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import Head from 'next/head'
import React from 'react'

const Pages: CodelabPage<DashboardTemplateProps> = () => {
  const { currentApp } = useAppState()

  return (
    <>
      <Head>
        <title>Pages | {currentApp?.name} | Codelab</title>
      </Head>
    </>
  )
}

export default Pages

export const getServerSideProps = withPageAuthRequired()

Pages.Layout = (page) => {
  return (
    <AppProvider>
      <DashboardTemplate
        MainPane={PageMainPane}
        SidebarNavigation={SidebarNavigation}
      >
        {page.children}
      </DashboardTemplate>
    </AppProvider>
  )
}
