import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateInterfaceButton,
  CreateInterfaceModal,
  DeleteInterfaceModal,
  GetInterfacesTable,
} from '@codelab/modules/type'
import { PageHeader } from 'antd'
import { AppListLayout } from 'apps/web/src/layout/AppListLayout'
import React from 'react'

const InterfacesPage = () => {
  const headerButtons = [<CreateInterfaceButton key={0} />]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Interfaces"
        extra={headerButtons}
      />
      <CreateInterfaceModal />
      <DeleteInterfaceModal />
      <section style={{ marginTop: padding.sm }}>
        <GetInterfacesTable />
      </section>
    </>
  )
}

InterfacesPage.Layout = AppListLayout
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
InterfacesPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default InterfacesPage
