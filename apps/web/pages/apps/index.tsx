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
import { AppListLayout } from 'apps/web/src/layout/AppListLayout'
import React from 'react'

const AppsPage = () => {
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

AppsPage.Layout = AppListLayout
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
AppsPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default AppsPage
