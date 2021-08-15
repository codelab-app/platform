import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagModal,
  DeleteTagsButton,
  GetTagsTree,
  UpdateTagModal,
  useTagTree,
} from '@codelab/frontend/modules/tag'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const TagPage: NextPageTemplate<'dashboard'> = () => {
  const { checkedTags } = useTagTree()

  console.log(checkedTags)

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

TagPage.Template = MainDashboardTemplate
TagPage.MainPane = () => <GetTagsTree />

export const getServerSideProps = withPageAuthRequired()

export default TagPage
