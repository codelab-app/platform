import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourcesModal,
  GetResourcesTable,
  UpdateResourceModal,
} from '@codelab/frontend/modules/resource'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
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
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const ResourcesPage: CodelabPage<DashboardTemplateProps> = () => {
  const store = useStore()

  const [, { isLoading }] = useStatefulExecutor(
    () => store.tagService.getAll(),
    {
      executeOnMount: true,
    },
  )

  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>

      <CreateResourceModal
        resourceService={store.resourceService}
        userService={store.userService}
      />
      <UpdateResourceModal resourceService={store.resourceService} />
      <DeleteResourcesModal resourceService={store.resourceService} />
      <ContentSection>
        <GetResourcesTable resourceService={store.resourceService} />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const store = useStore()

  const pageHeaderButtons = [
    <div css={tw`flex flex-row items-center justify-center gap-2`} key="create">
      <CreateResourceButton
        key="create"
        resourceService={store.resourceService}
      />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Resource" />
}

export default ResourcesPage

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }: GetServerSidePropsContext) => {
    // const store = initializeStore({ user })

    return {
      // props: { snapshot: getSnapshot(store) },
      props: {},
    }
  },
})

ResourcesPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={Header}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem, resourceMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}
