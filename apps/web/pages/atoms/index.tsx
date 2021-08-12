import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { padding } from '@codelab/frontend/style'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import React from 'react'

const AtomsPage: NextPageTemplate = () => {
  const pageHeaderButtons = [<CreateAtomButton key={0} />]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Atom"
        extra={pageHeaderButtons}
      />
      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />
      <section style={{ marginTop: padding.sm }}>
        <GetAtomsTable />
      </section>
    </>
  )
}

AtomsPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default AtomsPage
