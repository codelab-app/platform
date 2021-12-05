import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { useAppState, withAppProvider } from '@codelab/frontend/modules/app'
import { PageMainPane } from '@codelab/frontend/modules/page'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import Head from 'next/head'
import React from 'react'

const Pages: CodelabPage = () => {
  const { currentApp } = useAppState()

  return (
    <>
      <Head>
        <title>Pages | {currentApp?.name} | Codelab</title>
      </Head>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

Pages.Template = withAppProvider(DashboardTemplate)
Pages.MainPane = PageMainPane
Pages.Header = null
Pages.SidebarNavigation = SidebarNavigation
Pages.MetaPane = null

export default Pages
