import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CreateTagButton,
  CreateTagModal,
  GetTagsTree,
} from '@codelab/modules/tag'
import { PageHeader } from 'antd'
import React from 'react'
import { NextPageTemplate } from '../../src/templates/Layout.interface'
import { MainDashboardTemplate } from '../../src/templates/MainDashboardTemplate'

const TagPage: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [<CreateTagButton />]

  return (
    <>
      <PageHeader ghost={false} title="Tags" extra={pageHeaderButtons} />
      <CreateTagModal />
      <GetTagsTree />
    </>
  )
}

TagPage.Template = MainDashboardTemplate
TagPage.MainPane = () => (
  <>
    <GetTagsTree />
  </>
)

export const getServerSideProps = withPageAuthRequired()

export default TagPage
