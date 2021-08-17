import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import React from 'react'

const AdminPage: CodelabPage = () => {
  return <PageHeader ghost={false} title="Admin" />
}

export const getServerSideProps = withPageAuthRequired()

AdminPage.Template = DashboardTemplate
AdminPage.Header = null
AdminPage.MetaPane = null
AdminPage.MainPane = null
AdminPage.SidebarNavigation = null

export default AdminPage
