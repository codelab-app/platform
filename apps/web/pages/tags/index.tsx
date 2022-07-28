import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/modules/tag'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  appMenuItem,
  ContentSection,
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

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { tagService, userService } = useStore()

  const [, { isLoading }] = useStatefulExecutor(() => tagService.getAll(), {
    executeOnMount: true,
  })

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal tagService={tagService} userService={userService} />
      <UpdateTagModal tagService={tagService} />
      <DeleteTagsModal tagService={tagService} />

      <ContentSection>
        <GetTagsTable loading={isLoading} tagService={tagService} />
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
  const store = useStore()

  return (
    <DashboardTemplate
      ExplorerPane={() => <GetTagsTree tagService={store.tagService} />}
      Header={TagPageHeader}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired()
