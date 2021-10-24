import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { initializeApollo } from '@codelab/frontend/model/infra/apollo'
import {
  initializeStore,
  REDUX_STATE_PROP_NAME,
} from '@codelab/frontend/model/infra/redux'
import {
  AppState,
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  getApps,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { ContentSection } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
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

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const session = await getSession(context.req, context.res)

    const apolloClient = initializeApollo({
      accessToken: session?.accessToken,
    })

    const reduxStore = initializeStore({}, apolloClient)

    const dispatch = reduxStore.dispatch as ThunkDispatch<
      AppState,
      unknown,
      AnyAction
    >

    await dispatch(getApps({}))

    const props = {
      [REDUX_STATE_PROP_NAME]: reduxStore.getState(),
    }

    return {
      props,
    }
  },
})

AppsPage.Template = DashboardTemplate
AppsPage.SidebarNavigation = null
AppsPage.Header = null
AppsPage.MetaPane = null
AppsPage.MainPane = null

export default AppsPage
