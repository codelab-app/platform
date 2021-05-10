import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateAppButton,
  CreateAppModal,
  GetAppsList,
} from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { PageHeader } from 'antd'
import { LayoutApp } from 'apps/web/src/layout/Layout--app'
import React from 'react'
import { NextPageLayout } from '../../src/layout/Layout.d'

const AppsPage: NextPageLayout = () => {
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
      {/* <UpdateAppModal />
      <DeleteAppModal /> */}
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

AppsPage.Layout = LayoutApp

export default AppsPage
