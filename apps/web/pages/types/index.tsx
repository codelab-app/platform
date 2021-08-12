import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  GetTypesTable,
  UpdateTypeModal,
} from '@codelab/frontend/modules/type'
import { padding } from '@codelab/frontend/style'
import { PageHeader } from 'antd'
import { NextPageTemplate } from 'apps/web/src/templates/Layout.interface'
import { MainDashboardTemplate } from 'apps/web/src/templates/MainDashboardTemplate'
import React from 'react'

const TypesPage: NextPageTemplate<'dashboard'> = () => {
  const headerButtons = [<CreateTypeButton key={0} />]

  return (
    <>
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

TypesPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default TypesPage
