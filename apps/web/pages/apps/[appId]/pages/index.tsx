import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { AppContext, withAppQueryProvider } from '@codelab/frontend/modules/app'
import { PageMainPane } from '@codelab/frontend/modules/page'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import Head from 'next/head'
import React, { useContext } from 'react'

const Pages: CodelabPage = () => {
  const { app } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>Pages | {app.name} | Codelab</title>
      </Head>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

Pages.Template = withAppQueryProvider(DashboardTemplate)
Pages.MainPane = PageMainPane
Pages.Header = null
Pages.SidebarNavigation = SidebarNavigation
Pages.MetaPane = null

export default Pages
