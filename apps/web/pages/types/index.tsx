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
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const TypesPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

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

const Header = () => {
  const headerButtons = [<CreateTypeButton key={0} />]

  return (
    <PageHeader
      ghost={false}
      // onBack={() => router.back()}
      title="Types"
      extra={headerButtons}
    />
  )
}

TypesPage.Template = DashboardTemplate
TypesPage.templateProps = {
  SidebarNavigation,
  Header,
}

export default TypesPage
