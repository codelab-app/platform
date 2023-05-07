import { PageHeader } from '@ant-design/pro-components/lib'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  AtomsTable,
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  UpdateAtomModal,
} from '@codelab/frontend/domain/atom'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />

      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />

      <ContentSection>
        <AtomsTable />
      </ContentSection>
    </>
  )
})

const Header = () => {
  const pageHeaderButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`} key="header">
      <CreateAtomButton key="create" />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Atom" />
}

export default AtomsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

AtomsPage.Layout = ({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={Header}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
}
