import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { PageHeader } from 'antd'
import { MainDashboardTemplate } from 'apps/web/src/templates/MainDashboardTemplate'
import React from 'react'

const AdminPage: NextPageTemplate<'dashboard'> = () => {
  return (
    <>
      <PageHeader ghost={false} title="Admin" />
    </>
  )
}

AdminPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default AdminPage
