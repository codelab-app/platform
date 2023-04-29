import { PageHeader } from '@ant-design/pro-layout'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  ComponentsTable,
  CreateComponentButton,
  CreateComponentModal,
  DeleteComponentModal,
  UpdateComponentModal,
} from '@codelab/frontend/domain/component'
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

const ComponentsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <CreateComponentModal />
      <UpdateComponentModal />
      <DeleteComponentModal />

      <ContentSection>
        <ComponentsTable />
      </ContentSection>
    </>
  )
})

const Header = () => {
  const pageHeaderButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`} key="header">
      <CreateComponentButton />
    </div>,
  ]

  return (
    <PageHeader extra={pageHeaderButtons} ghost={false} title="Component" />
  )
}

export default ComponentsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

ComponentsPage.Layout = ({ children }) => {
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
