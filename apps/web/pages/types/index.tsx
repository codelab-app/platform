import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
import {
  CreateTypeButton,
  CreateTypeModal,
  DeleteTypeModal,
  GetTypesTable,
  ImportTypesUpload,
  UpdateTypeModal,
  useTypeState,
} from '@codelab/frontend/modules/type'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'
import { ExportTypesButton } from '../../../../libs/frontend/modules/type/src/use-cases/types'

const TypesPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <CreateTypeModal />
      <DeleteTypeModal />
      <UpdateTypeModal />
      <ContentSection>
        <GetTypesTable />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const { selectedIds } = useTypeState()

  const headerButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`}>
      <ExportTypesButton typeIds={selectedIds} />
      <ImportTypesUpload />
      <CreateTypeButton key={0} />
    </div>,
  ]

  return (
    <PageHeader
      extra={headerButtons}
      // onBack={() => router.back()}
      ghost={false}
      title="Types"
    />
  )
}

export default TypesPage

export const getServerSideProps = withPageAuthRequired()

TypesPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
