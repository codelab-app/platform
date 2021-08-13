import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
  GetComponentsTable,
  UpdateComponentModal,
} from '@codelab/frontend/modules/component'
import { padding } from '@codelab/frontend/style'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import PageHeader from 'antd/lib/page-header'
import Head from 'next/head'
import React from 'react'

const Components: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [<CreateComponentButton key={0} />]

  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

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
