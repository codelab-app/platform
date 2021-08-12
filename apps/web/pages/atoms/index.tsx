import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { padding } from '@codelab/frontend/style'
import { PageHeader } from 'antd'
import { NextPageTemplate } from 'apps/web/src/templates/Layout.interface'
import { MainDashboardTemplate } from 'apps/web/src/templates/MainDashboardTemplate'
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
