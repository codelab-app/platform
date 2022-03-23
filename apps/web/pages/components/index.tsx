import { PlusOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { getGraphQLClient } from '@codelab/frontend/model/infra/redux'
import { userSlice } from '@codelab/frontend/modules/user'
// import { UpdateTagModal } from '@codelab/frontend/modules/tag'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Components: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  const [, { isLoading }] = useLoadingState(
    () => store.componentService.getAll(),
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      {/* <CreateComponentModal />*/}
      {/* <UpdateComponentModal />*/}
      {/* <DeleteComponentModal />*/}
      {/* <ContentSection>*/}
      {/*  <GetComponentsTable />*/}
      {/* </ContentSection>*/}
    </>
  )
})

const Header = () => {
  // const { openCreateModal } = useComponentDispatch()

  return (
    <PageHeader
      extra={[
        <Button
          icon={<PlusOutlined />}
          key={0}
          // onClick={() => openCreateModal()}
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
        // TODO investigate type issue
        // store.dispatch(componentEndpoints.endpoints.GetComponents.initiate())
        store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))
        // await Promise.all(componentEndpoints.util.getRunningOperationPromises())

        return { props: {} }
      },
  ),
})

export const getServerSideProps = withPageAuthRequired({})

Components.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})

export default Components
