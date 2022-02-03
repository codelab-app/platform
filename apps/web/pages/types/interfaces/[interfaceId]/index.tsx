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
  UpdateFieldModal,
  useGetCurrentInterfaceWithFields,
} from '@codelab/frontend/modules/type'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const InterfaceDetailPage: CodelabPage<DashboardTemplateProps> = () => {
  const { type, isLoading, interfaceId } = useGetCurrentInterfaceWithFields()

  return (
    <>
      <Head>
        <title>{type?.name ? `${type.name} | ` : ''}Codelab</title>
      </Head>

      <CreateFieldModal interfaceId={interfaceId} />
      <UpdateFieldModal interfaceId={interfaceId} />
      <DeleteFieldModal interfaceId={interfaceId} />
      <ContentSection>
        <FieldsTable interfaceType={type} isLoading={isLoading} />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const headerButtons = [<CreateFieldButton key={0} />]
  const router = useRouter()
  const { type } = useGetCurrentInterfaceWithFields()

  return (
    <PageHeader
      extra={headerButtons}
      ghost={false}
      onBack={() => router.back()}
      title={type?.name}
    />
  )
}

export default InterfaceDetailPage

export const getServerSideProps = withPageAuthRequired()

InterfaceDetailPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
