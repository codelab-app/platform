import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  GetTypesTable,
  UpdateTypeModal,
} from '@codelab/modules/type'
import { PageHeader } from 'antd'
import { AppListLayout } from 'apps/web/src/layout/AppListLayout'
import React from 'react'

const TypesPage = () => {
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

TypesPage.Layout = AppListLayout
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
TypesPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default TypesPage
