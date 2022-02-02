import { EllipsisOutlined } from '@ant-design/icons'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  getGraphQLClient,
  setClientAuthHeaders,
} from '@codelab/frontend/model/infra/redux'
import {
  appEndpoints,
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  ImportAppModal,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, PageHeader } from 'antd'
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
  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal />
      {/* <UpdateAppModal /> */}
      <DeleteAppModal />
      {/* <ImportAppModal /> */}

      <ContentSection>
        <GetAppsList />
      </ContentSection>
    </>
  )
}

export default AppsPage

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: reduxStoreWrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      await setClientAuthHeaders(context)

      // store.dispatch(appEndpoints.endpoints.GetApps.initiate({}))

      // await Promise.all(appEndpoints.util.getRunningOperationPromises())

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
