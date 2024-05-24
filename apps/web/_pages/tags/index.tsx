import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import {
  CreateTagModal,
  DeleteTagsModal,
  type TagsView,
  TagsViewLayout,
  UpdateTagForm,
  UpdateTagModal,
} from '@codelab/frontend/application/tag'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import Head from 'next/head'
import React from 'react'

const TagsView: TagsView = () => {
  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagsModal />

      <ContentSection>
        <UpdateTagForm />
      </ContentSection>
    </>
  )
}

export default TagsView

TagsView.Layout = TagsViewLayout

export const getServerSideProps = withPageAuthRedirect()
