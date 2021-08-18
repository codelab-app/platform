import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
  GetComponentsTable,
  UpdateComponentModal,
} from '@codelab/frontend/modules/component'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import PageHeader from 'antd/lib/page-header'
import Head from 'next/head'
import React from 'react'

const Components: CodelabPage = () => {
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
      <ContentSection>
        <GetComponentsTable />
      </ContentSection>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

Components.Template = DashboardTemplate
Components.Header = null
Components.MetaPane = null
Components.MainPane = null
Components.SidebarNavigation = SidebarNavigation

export default Components
