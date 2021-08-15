import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { PageMainPane } from '@codelab/frontend/modules/page'
import {
  AppContext,
  withAppQueryProvider,
} from '@codelab/frontend/presenter/container'
import { DashboardLayout } from '@codelab/frontend/view/templates'
import Head from 'next/head'
import React, { useContext } from 'react'

const Pages: NextPageTemplate<'dashboard'> = () => {
  const { app } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>Pages | {app.name} | Codelab</title>
      </Head>
    </>
  )
}

Pages.Template = withAppQueryProvider(DashboardLayout)
Pages.MainPane = PageMainPane

export const getServerSideProps = withPageAuthRequired()

export default Pages
