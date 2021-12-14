import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
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
  DashboardTemplateProps,
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

export const getServerSideProps = withPageAuthRequired()

const Header = () => {
  const { selectedIds } = useAtomState()

  const pageHeaderButtons = [
    <div
      key="export_import"
      css={tw`flex flex-row items-center justify-center gap-2`}
    >
      <ExportAtomsButton atomIds={selectedIds} />
      <ImportAtomsUpload />
      <CreateAtomButton key="create" centerIcon />
    </div>,
  ]

  return <PageHeader ghost={false} title="Atom" extra={pageHeaderButtons} />
}

AtomsPage.Template = DashboardTemplate
AtomsPage.templateProps = {
  SidebarNavigation,
  Header,
}

export default AtomsPage
