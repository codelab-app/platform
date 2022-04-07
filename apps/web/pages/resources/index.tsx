import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  GetResourcesTable,
  UpdateResourceModal,
} from '@codelab/frontend/modules/resource'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { resourceTypes } from '@codelab/shared/abstract/core'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'
import tw from 'twin.macro'

export const ResourcesPage: CodelabPage<DashboardTemplateProps> = observer(
  () => {
    const store = useStore()
    const resourceService = store.resourceService
    const atomService = store.atomService

    useEffect(() => {
      atomService.getAll({ type_IN: resourceTypes })
    }, [])

    return (
      <>
        <Head>
          <title>Resources | Codelab</title>
        </Head>

        <DeleteResourceModal resourceService={resourceService} />
        <CreateResourceModal
          resourceService={resourceService}
          typeService={store.typeService}
        />
        <UpdateResourceModal
          resourceService={resourceService}
          typeService={store.typeService}
        />

        <ContentSection>
          <GetResourcesTable resourceService={resourceService} />
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
      <CreateResourceButton
        key="create"
        resourceService={store.resourceService}
      />
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
