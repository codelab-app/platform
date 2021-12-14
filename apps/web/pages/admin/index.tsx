import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  ResetDataButton,
  SeedBaseTypesButton,
} from '@codelab/frontend/modules/admin'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
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

const AdminHeader = () => <PageHeader ghost={false} title="Admin" />

export const getServerSideProps = withPageAuthRequired()

AdminPage.Template = DashboardTemplate
AdminPage.templateProps = {
  SidebarNavigation,
  Header: AdminHeader,
}

export default AdminPage
