import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  ExecuteCommandButton,
  ExecuteCommandModal,
  ResetDataButton,
} from '@codelab/frontend/modules/admin'
import { useStore } from '@codelab/frontend/presenter/container'
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
  const { adminService } = useStore()

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <ExecuteCommandModal />

      <ContentSection css={tw`p-4 bg-white`}>
        <Space>
          <ResetDataButton adminService={adminService} />
          <ExecuteCommandButton />
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
