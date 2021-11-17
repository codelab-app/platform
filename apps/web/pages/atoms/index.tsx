import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const AtomsPage: CodelabPage = () => {
  const pageHeaderButtons = [<CreateAtomButton key={0} centerIcon />]

  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Atom"
        extra={pageHeaderButtons}
      />
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

AtomsPage.Template = DashboardTemplate
AtomsPage.Header = null
AtomsPage.MetaPane = null
AtomsPage.MainPane = null
AtomsPage.SidebarNavigation = SidebarNavigation

export default AtomsPage
