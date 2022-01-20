import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  ExportAtomsButton,
  GetAtomsTable,
  ImportAtomsUpload,
  UpdateAtomModal,
  useAtomState,
} from '@codelab/frontend/modules/atom'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />
      <ContentSection>
        <GetAtomsTable />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const { selectedIds } = useAtomState()

  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <ExportAtomsButton atomIds={selectedIds} />
      <ImportAtomsUpload />
      <CreateAtomButton key="create" />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Atom" />
}

export default AtomsPage

export const getServerSideProps = withPageAuthRequired()

AtomsPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
