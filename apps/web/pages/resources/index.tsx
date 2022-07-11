import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  GetResourcesList,
  UpdateResourceModal,
} from '@codelab/frontend/modules/resource'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  appMenuItem,
  ContentSection,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
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

export const getServerSideProps = withPageAuthRequired()

ResourcesPage.Layout = observer((resource) => {
  return (
    <DashboardTemplate
      Header={ResourcesPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem, resourceMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {resource.children}
    </DashboardTemplate>
  )
})
