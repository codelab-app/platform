import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/domain/tag'
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
  const { tagService } = useStore()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      ExplorerPane={() => <GetTagsTree tagService={tagService} />}
      Header={TagPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired()
