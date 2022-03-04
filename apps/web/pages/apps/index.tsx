import { EllipsisOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { setClientAuthHeaders } from '@codelab/frontend/model/infra/graphql'
import { initializeStore, useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, PageHeader } from 'antd'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'

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

const AppsPageHeader = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <CreateAppButton apps={store.appStore} key={0} />,
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
})

const AppsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal apps={store.appStore} />
      <UpdateAppModal apps={store.appStore} />
      <DeleteAppModal apps={store.appStore} />
      {/* <ImportAppModal /> */}

      <ContentSection>
        <GetAppsList apps={store.appStore} />
      </ContentSection>
    </>
  )
})

export default AppsPage

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    await setClientAuthHeaders(context)

    const store = initializeStore()

    await store.appStore.getAll()

    return {
      props: { initialState: getSnapshot(store) },
    }
  },
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
