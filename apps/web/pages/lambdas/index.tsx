import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { PageHeader } from 'antd'
import React from 'react'
import { NextPageTemplate } from '../../src/templates/Layout.d'
import { MainDashboardTemplate } from '../../src/templates/MainDashboardTemplate'

const LambdasPage: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [
    <CreateAppButton key={0} />,
    <SignOutUserButton key={1} />,
  ]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Apps"
        extra={pageHeaderButtons}
      />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

LambdasPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default LambdasPage
