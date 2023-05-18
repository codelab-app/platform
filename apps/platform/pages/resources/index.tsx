import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceModal,
  DeleteResourceModal,
  ResourcesList,
  ResourceToolbar,
  UpdateResourceModal,
} from '@codelab/frontend/domain/resource'
import {
  Header,
  HeaderBreadcrumb,
} from '@codelab/frontend/presentation//codelab-ui'
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
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const ResourcesPageHeader = observer(() => (
  <Header
    direction={<HeaderBreadcrumb items={[{ title: 'Resources' }]} />}
    logo={
      <Image
        alt="codelab logo"
        css={tw`w-full h-full`}
        preview={false}
        src="/logo.png"
      />
    }
    toolbar={<ResourceToolbar />}
  />
))

const ResourcesPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>
      <ContentSection>
        <CreateResourceModal />
        <UpdateResourceModal />
        <DeleteResourceModal />

        <ResourcesList />
      </ContentSection>
    </>
  )
}

export default ResourcesPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

ResourcesPage.Layout = observer(({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={ResourcesPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
})
