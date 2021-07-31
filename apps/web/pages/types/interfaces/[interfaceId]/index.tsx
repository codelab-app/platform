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
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { NextPageTemplate } from '../../../../src/templates/Layout.interface'
import { MainDashboardTemplate } from '../../../../src/templates/MainDashboardTemplate'

const InterfaceDetailPage: NextPageTemplate<'dashboard'> = () => {
  const {
    interface: { name },
    tree,
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
        <FieldsTable tree={tree} />
      </section>
    </>
  )
}

InterfaceDetailPage.Template = withInterfaceQueryProvider(MainDashboardTemplate)
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
InterfaceDetailPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default InterfaceDetailPage
