import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { padding } from '@codelab/frontend/style'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const AppsPage: CodelabPage = () => {
  const pageHeaderButtons = [
    <CreateAppButton key={0} />,
    <SignOutUserButton key={1} />,
  ]

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Apps"
        extra={pageHeaderButtons}
      />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

AppsPage.Template = DashboardTemplate
AppsPage.SidebarNavigation = SidebarNavigation
AppsPage.Header = null
AppsPage.MetaPane = null
AppsPage.MainPane = null

export default AppsPage
