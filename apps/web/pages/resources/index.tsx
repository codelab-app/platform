import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { setClientAuthHeaders } from '@codelab/frontend/model/infra/graphql'
import { initializeStore, useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateResourceButton,
  CreateResourceModal,
  GetResourcesTable,
} from '@codelab/frontend/modules/resource'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

export const ResourcesPage: CodelabPage<DashboardTemplateProps> = observer(
  () => {
    const store = useStore()

    return (
      <>
        <Head>
          <title>Resources | Codelab</title>
        </Head>

        <CreateResourceModal resourceService={store.resourceService} />
        <ContentSection>
          <GetResourcesTable resourceService={store.resourceService} />
        </ContentSection>
      </>
    )
  },
)

const Header = observer(() => {
  const store = useStore()


  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <CreateResourceButton key="create" resourceService={store.resourceService} />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Resource" />
})

export default ResourcesPage

export const getServerSideProps = withPageAuthRequired()

ResourcesPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
