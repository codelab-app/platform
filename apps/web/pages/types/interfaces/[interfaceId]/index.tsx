import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  FieldsTable,
  InterfaceContext,
  UpdateFieldModal,
  withInterfaceQueryProvider,
} from '@codelab/modules/type'
import { PageHeader } from 'antd'
import { MainDashboardTemplate } from 'apps/web/src/templates/MainDashboardTemplate'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const InterfaceDetailPage = () => {
  const {
    interface: {
      fieldCollection: { fields },
      name,
    },
    interfaceTypesById,
  } = useContext(InterfaceContext)

  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => router.back()}
        title={name}
        extra={headerButtons}
      />
      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
      <section style={{ marginTop: padding.sm }}>
        <FieldsTable fields={fields} typesById={interfaceTypesById} />
      </section>
    </>
  )
}

InterfaceDetailPage.Layout = withInterfaceQueryProvider(MainDashboardTemplate)
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
InterfaceDetailPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default InterfaceDetailPage
