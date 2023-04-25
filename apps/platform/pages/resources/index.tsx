import { PageHeader } from '@ant-design/pro-components/lib'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  ResourcesList,
  UpdateResourceModal,
} from '@codelab/frontend/domain/resource'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
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

const ResourcesPageHeader = observer(() => {
  const { resourceService } = useStore()

  return (
    <PageHeader
      extra={[<CreateResourceButton key={0} />]}
      ghost={false}
      title="Resources"
    />
  )
})

const ResourcesPage: CodelabPage<DashboardTemplateProps> = () => {
  const store = useStore()

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
