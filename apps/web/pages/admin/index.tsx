import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
import {
  ResetDataButton,
  SeedBaseTypesButton,
} from '@codelab/frontend/modules/admin'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader, Space } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const AdminPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <ContentSection css={tw`p-4 bg-white`}>
      <Space>
        <ResetDataButton />
        <SeedBaseTypesButton />
      </Space>
    </ContentSection>
  )
}

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
