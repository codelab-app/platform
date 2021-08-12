import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
  GetComponentsTable,
  UpdateComponentModal,
} from '@codelab/frontend/modules/component'
import { padding } from '@codelab/frontend/style'
import PageHeader from 'antd/lib/page-header'
import React from 'react'
import { NextPageTemplate } from '../../src/templates/Layout.interface'
import { MainDashboardTemplate } from '../../src/templates/MainDashboardTemplate'

const Components: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [<CreateComponentButton key={0} />]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Components"
        extra={pageHeaderButtons}
      />
      <CreateComponentModal />
      <UpdateComponentModal />
      <DeleteComponentModal />
      <section style={{ marginTop: padding.sm }}>
        <GetComponentsTable />
      </section>
    </>
  )
}

Components.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default Components
