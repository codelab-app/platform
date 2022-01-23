import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
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

const Header = () => {
  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()

  const {
    interface: { name },
    tree,
  } = useContext(InterfaceContext)

  return (
    <PageHeader
      extra={headerButtons}
      ghost={false}
      onBack={() => router.back()}
      title={name}
    />
  )
}

export default InterfaceDetailPage

export const getServerSideProps = withPageAuthRequired()

InterfaceDetailPage.Layout = (page) => {
  return (
    <InterfaceQueryProvider>
      <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
        {page.children}
      </DashboardTemplate>
    </InterfaceQueryProvider>
  )
}
