import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
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
    <DeleteTagsButton ids={checkedTags.map((tag) => tag.toString())} key={1} />,
    <ExportTagsButton key={2} />,
    <ImportTagsUpload key={3} />,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Tags" />
}

export const getServerSideProps = withPageAuthRequired()

export default TagPage

TagPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={TagPageHeader}
      MainPane={GetTagsTree}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
}
