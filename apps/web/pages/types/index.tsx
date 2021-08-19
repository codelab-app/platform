import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  GetTypesTable,
  UpdateTypeModal,
} from '@codelab/frontend/modules/type'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const TypesPage: CodelabPage = () => {
  const headerButtons = [<CreateTypeButton key={0} />]

  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Types"
        extra={headerButtons}
      />
      <CreateTypeModal />
      <DeleteTypeModal />
      <UpdateTypeModal />
      <ContentSection>
        <GetTypesTable />
      </ContentSection>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

TypesPage.Template = DashboardTemplate
TypesPage.Header = null
TypesPage.MetaPane = null
TypesPage.MainPane = null
TypesPage.SidebarNavigation = SidebarNavigation

export default TypesPage
