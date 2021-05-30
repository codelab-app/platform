import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/modules/atom'
import { PageHeader } from 'antd'
import { AppListLayout } from 'apps/web/src/layout/AppListLayout'
import React from 'react'

const AtomsPage = () => {
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

AtomsPage.Layout = AppListLayout
// AppsPage.MainPane = () => <></>
// AppsPage.MetaPane = () => <></>
AtomsPage.SidebarNavigation = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default AtomsPage
