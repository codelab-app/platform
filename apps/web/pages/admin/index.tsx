import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  ExecuteCommandButton,
  ExecuteCommandModal,
  ExportButton,
  ImportButton,
  ResetDataButton,
} from '@codelab/frontend/modules/admin'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AdminPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <ExecuteCommandModal />

      <ContentSection css={tw`p-4 bg-white`}>
        <Space>
          <ResetDataButton adminService={store.adminService} />
          <ExecuteCommandButton />
          <ExportButton adminService={store.adminService} />
          <ImportButton adminService={store.adminService} />
        </Space>
      </ContentSection>
    </>
  )
})

export default AdminPage

export const getServerSideProps = withPageAuthRequired()

AdminPage.Layout = (page) => {
  const AdminHeader = () => <PageHeader ghost={false} title="Admin" />

  return (
    <DashboardTemplate
      Header={AdminHeader}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
}
