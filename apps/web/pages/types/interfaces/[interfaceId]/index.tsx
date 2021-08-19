import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  FieldsTable,
  InterfaceContext,
  UpdateFieldModal,
  withInterfaceQueryProvider,
} from '@codelab/frontend/modules/type'
import { padding } from '@codelab/frontend/style'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const InterfaceDetailPage: CodelabPage = () => {
  const {
    interface: { name },
    tree,
  } = useContext(InterfaceContext)

  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{name} | Codelab</title>
      </Head>

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

export const getServerSideProps = withPageAuthRequired()

InterfaceDetailPage.Template = withInterfaceQueryProvider(DashboardTemplate)
InterfaceDetailPage.MainPane = null
InterfaceDetailPage.MetaPane = null
InterfaceDetailPage.SidebarNavigation = SidebarNavigation
InterfaceDetailPage.Header = null

export default InterfaceDetailPage
