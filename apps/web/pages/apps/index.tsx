import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { getGraphQLClient } from '@codelab/frontend/model/infra/api'
import { reduxStoreWrapper } from '@codelab/frontend/model/infra/redux'
import {
  appEndpoints,
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { getAuthToken } from '@codelab/frontend/shared/utils'
import { ContentSection } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { GetServerSidePropsContext } from 'next'
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
      <ContentSection>
        <GetAppsList />
      </ContentSection>
    </>
  )
}

export const preFetchApps = reduxStoreWrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(appEndpoints.endpoints.GetApps.initiate())
    await Promise.all(appEndpoints.util.getRunningOperationPromises())

    return {
      props: {},
    }
  },
)

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    // setup authentication for client
    const session = await getSession(context.req, context.res)
    const token = session?.accessToken || getAuthToken()

    getGraphQLClient({
      headers: { authorization: token ? `Bearer ${token}` : '' },
    })

    await preFetchApps(context)

    return {
      props: {},
    }
  },
})

AppsPage.Template = DashboardTemplate
AppsPage.SidebarNavigation = null
AppsPage.Header = null
AppsPage.MetaPane = null
AppsPage.MainPane = null

export default AppsPage
