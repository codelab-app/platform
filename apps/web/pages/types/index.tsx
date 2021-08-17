import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  GetTypesTable,
  UpdateTypeModal,
} from '@codelab/frontend/modules/type'
import { padding } from '@codelab/frontend/style'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
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
      <section style={{ marginTop: padding.sm }}>
        <GetTypesTable />
      </section>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

TypesPage.Template = DashboardTemplate
TypesPage.Header = null
TypesPage.MetaPane = null
TypesPage.MainPane = null
TypesPage.SidebarNavigation = null

export default TypesPage
