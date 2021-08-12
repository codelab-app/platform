import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  CreateTagButton,
  CreateTagModal,
  DeleteTagModal,
  GetTagsTree,
  UpdateTagModal,
} from '@codelab/frontend/modules/tag'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import React from 'react'

const TagPage: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [<CreateTagButton key={0} />]

  return (
    <>
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
