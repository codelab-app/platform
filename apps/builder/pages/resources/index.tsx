import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  GetResourcesList,
  UpdateResourceModal,
} from '@codelab/frontend/domain/resource'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  SidebarNavigation,
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

ResourcesPage.Layout = observer((resource) => {
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={ResourcesPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {resource.children}
    </DashboardTemplate>
  )
})
