import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  ExportAtomsButton,
  GetAtomsTable,
  ImportAtomsUpload,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal atomStore={store.atomStore} />
      <UpdateAtomModal atomStore={store.atomStore} />
      <DeleteAtomsModal atomStore={store.atomStore} />
      <ContentSection>
        <GetAtomsTable atomStore={store.atomStore} />
      </ContentSection>
    </>
  )
})

const Header = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <ExportAtomsButton atomStore={store.atomStore} />
      <ImportAtomsUpload atomStore={store.atomStore} />
      <CreateAtomButton atomStore={store.atomStore} key="create" />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Atom" />
})

export default AtomsPage

export const getServerSideProps = withPageAuthRequired()

AtomsPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
