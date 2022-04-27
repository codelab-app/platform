import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/modules/tag'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  const [, { isLoading }] = useLoadingState(() => store.tagService.getAll(), {
    executeOnMount: true,
  })

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal tagService={store.tagService} />
      <UpdateTagModal tagService={store.tagService} />
      <DeleteTagsModal tagService={store.tagService} />

      <ContentSection>
        <GetTagsTable loading={isLoading} tagService={store.tagService} />
      </ContentSection>
    </>
  )
})

const TagPageHeader = () => {
  const store = useStore()

  const pageHeaderButtons = [
    <CreateTagButton key={0} tagService={store.tagService} />,
    <DeleteTagsButton ids={[]} key={1} tagService={store.tagService} />,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Tags" />
}

export default TagPage

TagPage.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      Header={TagPageHeader}
      MainPane={() => <GetTagsTree tagService={store.tagService} />}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})
