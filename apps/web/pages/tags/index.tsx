import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { setClientAuthHeaders } from '@codelab/frontend/model/infra/graphql'
import {
  initializeStore,
  Snapshot,
  useStore,
} from '@codelab/frontend/model/infra/mobx'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/modules/tag'
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

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal tagService={store.tagService} />
      <UpdateTagModal tagService={store.tagService} />
      <DeleteTagsModal tagService={store.tagService} />
      <GetTagsTable tagService={store.tagService} />
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

export const getServerSideProps = withPageAuthRequired<Snapshot>({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    await setClientAuthHeaders(context)

    const store = initializeStore()

    await store.tagService.getTags()

    return {
      props: { snapshot: getSnapshot(store) },
    }
  },
})

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
