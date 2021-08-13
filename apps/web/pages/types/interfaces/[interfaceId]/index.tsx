import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
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
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const InterfaceDetailPage: NextPageTemplate<'dashboard'> = () => {
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

InterfaceDetailPage.Template = withInterfaceQueryProvider(MainDashboardTemplate)
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
InterfaceDetailPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default InterfaceDetailPage
