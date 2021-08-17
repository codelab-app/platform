import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagModal,
  DeleteTagsButton,
  GetTagsTree,
  UpdateTagModal,
  useTagState,
} from '@codelab/frontend/modules/tag'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage = () => {
  const { checkedTags } = useTagState()

  const pageHeaderButtons = [
    <CreateTagButton key={0} />,
    <DeleteTagsButton key={1} ids={checkedTags} />,
  ]

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <PageHeader ghost={false} title="Tags" extra={pageHeaderButtons} />
      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagModal />
      <GetTagsTree />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

TagPage.Template = DashboardTemplate
TagPage.MainPane = () => <GetTagsTree />
TagPage.Header = null
TagPage.MetaPane = null
TagPage.SidebarNavigation = null

export default TagPage
