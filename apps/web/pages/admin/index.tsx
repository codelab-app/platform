import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import React from 'react'

const AdminPage: NextPageTemplate<'dashboard'> = () => {
  return <PageHeader ghost={false} title="Admin" />
}

AdminPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default AdminPage
