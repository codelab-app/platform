import { EllipsisOutlined } from '@ant-design/icons'
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { API_ENV, getGraphQLClient } from '@codelab/frontend/model/infra/redux'
import {
  appEndpoints,
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton, userSlice } from '@codelab/frontend/modules/user'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, PageHeader } from 'antd'
import { useUserState } from 'libs/frontend/modules/user/src/hooks'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import { reduxStoreWrapper } from '../../src/store/reduxStoreWrapper'

const menu = (
  <Menu>
    <Menu.Item key="1">
      <ImportAppButton />
    </Menu.Item>
    <Menu.Item key="0">
      <SignOutUserButton type="link" />
    </Menu.Item>
  </Menu>
)

const AppsPageHeader = () => {
  const pageHeaderButtons = [
    <CreateAppButton key={0} />,
    <Dropdown key={1} overlay={menu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>,
  ]

  return (
    <PageHeader
      extra={pageHeaderButtons}
      // onBack={() => router.back()}
      ghost={false}
      title="Apps"
    />
  )
}

const AppsPage: CodelabPage<DashboardTemplateProps> = () => {
  const user = useUserState()

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />
      {/* <ImportAppModal /> */}

      <ContentSection>
        <GetAppsList />
      </ContentSection>
    </>
  )
}

export default AppsPage

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: reduxStoreWrapper.getServerSideProps(
    (store) =>
      async ({ req, res }: GetServerSidePropsContext) => {
        const session = await getSession(req, res)

        getGraphQLClient().setHeaders({
          cookie: `${req.headers.cookie}`,
        })

        store.dispatch(appEndpoints.endpoints.GetApps.initiate())
        store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))

        await Promise.all(
          appEndpoints.util.getRunningOperationPromises(),
          // userEndpoints.util.getRunningOperationPromises(),
        )

        return {
          props: {},
        }
      },
  ),
})

AppsPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
}
