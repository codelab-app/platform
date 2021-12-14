import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateFieldButton,
  CreateFieldModal,
  DeleteFieldModal,
  FieldsTable,
  InterfaceContext,
  InterfaceQueryProvider,
  UpdateFieldModal,
} from '@codelab/frontend/modules/type'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const InterfaceDetailPage: CodelabPage<DashboardTemplateProps> = () => {
  const {
    interface: { name },
    tree,
  } = useContext(InterfaceContext)

  return (
    <>
      <Head>
        <title>{name} | Codelab</title>
      </Head>

      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
      <ContentSection>
        <FieldsTable tree={tree} />
      </ContentSection>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

const Header = () => {
  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()

  const {
    interface: { name },
    tree,
  } = useContext(InterfaceContext)

  return (
    <PageHeader
      ghost={false}
      onBack={() => router.back()}
      title={name}
      extra={headerButtons}
    />
  )
}

InterfaceDetailPage.Template = DashboardTemplate
InterfaceDetailPage.templateProps = {
  SidebarNavigation,
  Header,
}
InterfaceDetailPage.providers = [InterfaceQueryProvider]

export default InterfaceDetailPage
