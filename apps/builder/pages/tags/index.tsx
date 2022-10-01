import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/domain/tag'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { useAsync } from 'react-use'

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { tagService, userService } = useStore()

  const { loading } = useAsync(() => {
    tagService.loadTagTree()

    return Promise.resolve()
  }, [])

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal tagService={tagService} userService={userService} />
      <UpdateTagModal tagService={tagService} />
      <DeleteTagsModal tagService={tagService} />

      <ContentSection>
        <GetTagsTable loading={loading} tagService={tagService} />
      </ContentSection>
    </>
  )
})

const TagPageHeader = observer(() => {
  const store = useStore()

  const pageHeaderButtons = [
    <CreateTagButton key={0} tagService={store.tagService} />,
    <DeleteTagsButton key={1} tagService={store.tagService} />,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Tags" />
})

export default TagPage

TagPage.Layout = observer((page) => {
  const { tagService, userService } = useStore()

  return (
    <DashboardTemplate
      ExplorerPane={() => <GetTagsTree tagService={tagService} />}
      Header={TagPageHeader}
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
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired()
