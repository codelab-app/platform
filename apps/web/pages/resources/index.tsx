import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneResource } from '@codelab/frontend/modules/resource'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  appMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ResourcesPage: CodelabPage<DashboardTemplateProps> = () => (
  <>
    <Head>
      <title>Resources | Codelab</title>
    </Head>
  </>
)

export default ResourcesPage

export const getServerSideProps = withPageAuthRequired()

ResourcesPage.Layout = observer((resource) => {
  const store = useStore()

  return (
    <DashboardTemplate
      ExplorerPane={() => (
        <ExplorerPaneResource
          resourceService={store.resourceService}
          userService={store.userService}
        />
      )}
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
