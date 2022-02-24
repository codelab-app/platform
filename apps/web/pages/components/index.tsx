import { PlusOutlined } from '@ant-design/icons'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { getGraphQLClient } from '@codelab/frontend/model/infra/redux'
import {
  componentEndpoints,
  CreateComponentModal,
  DeleteComponentModal,
  GetComponentsTable,
  UpdateComponentModal,
  useComponentDispatch,
} from '@codelab/frontend/modules/element'
import { userSlice } from '@codelab/frontend/modules/user'
// import { UpdateTagModal } from '@codelab/frontend/modules/tag'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, PageHeader } from 'antd'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import { reduxStoreWrapper } from '../../src/store/reduxStoreWrapper'

const Components: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <CreateComponentModal />
      <UpdateComponentModal />
      <DeleteComponentModal />
      <ContentSection>
        <GetComponentsTable />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const { openCreateModal } = useComponentDispatch()

  return (
    <PageHeader
      extra={[
        <Button
          icon={<PlusOutlined />}
          key={0}
          onClick={() => openCreateModal()}
          size="small"
        />,
      ]}
      ghost={false}
      title="Components"
    />
  )
}

export default Components

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: reduxStoreWrapper.getServerSideProps(
    (store) =>
      async ({ req, res }: GetServerSidePropsContext) => {
        const session = await getSession(req, res)
        getGraphQLClient().setHeaders({ cookie: `${req.headers.cookie}` })
        store.dispatch(componentEndpoints.endpoints.GetComponents.initiate())
        store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))
        await Promise.all(componentEndpoints.util.getRunningOperationPromises())

        return { props: {} }
      },
  ),
})

Components.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
