import { PageHeader } from 'antd'
import React from 'react'
import {
  CreateAppButton,
  CreateAppForm,
  GetAppsList,
  UpdateAppForm,
  DeleteAppForm,
} from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { padding } from '@codelab/frontend/style'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import { NextPageLayout } from '../_app'
import { LayoutApp } from 'apps/web/src/layout/Layout--app'

const AppsPage: NextPageLayout = () => {
  const pageHeaderButtons = [
    <CreateAppButton key={1} />,
    <SignOutUserButton key={2} />,
  ]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Apps"
        extra={pageHeaderButtons}
      />
      <CrudModal
        entityType={EntityType.App}
        actionType={ActionType.Create}
        okText="Create App"
        renderForm={() => <CreateAppForm />}
      />
      <CrudModal
        entityType={EntityType.App}
        actionType={ActionType.Update}
        okText="Update App"
        renderForm={() => <UpdateAppForm />}
      />
      <CrudModal
        entityType={EntityType.App}
        actionType={ActionType.Delete}
        okText="Delete App"
        renderForm={() => <DeleteAppForm />}
      />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

AppsPage.Layout = LayoutApp

export default AppsPage
