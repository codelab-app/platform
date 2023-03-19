import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  GetResourcesList,
  UpdateResourceModal,
} from '@codelab/frontend/domain/resource'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { ContentSection } from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ResourcesPageHeader = observer(() => {
  const { resourceService } = useStore()

  return (
    <PageHeader
      extra={[
        <CreateResourceButton key={0} resourceService={resourceService} />,
      ]}
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
        <CreateResourceModal
          resourceService={store.resourceService}
          userService={store.userService}
        />
        <UpdateResourceModal resourceService={store.resourceService} />
        <DeleteResourceModal resourceService={store.resourceService} />

        <GetResourcesList resourceService={store.resourceService} />
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
