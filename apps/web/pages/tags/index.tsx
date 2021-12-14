import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagsButton,
  DeleteTagsModal,
  ExportTagsButton,
  GetTagsTree,
  ImportTagsUpload,
  UpdateTagModal,
  useTagState,
} from '@codelab/frontend/modules/tag'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagsModal />
      <GetTagsTree />
    </>
  )
}

const TagPageHeader = () => {
  const { checkedTags } = useTagState()

  const pageHeaderButtons = [
    <CreateTagButton key={0} />,
    <DeleteTagsButton key={1} ids={checkedTags.map((tag) => tag.toString())} />,
    <ExportTagsButton key={2} />,
    <ImportTagsUpload key={3} />,
  ]

  return <PageHeader ghost={false} title="Tags" extra={pageHeaderButtons} />
}

export const getServerSideProps = withPageAuthRequired()

TagPage.Template = DashboardTemplate
TagPage.templateProps = {
  MainPane: GetTagsTree,
  SidebarNavigation,
  Header: TagPageHeader,
}

export default TagPage
