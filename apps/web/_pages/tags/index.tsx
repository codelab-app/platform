import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { CreateTagModal } from '@codelab/frontend-application-tag/use-cases/create-tag'
import { DeleteTagsModal } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import {
  UpdateTagForm,
  UpdateTagModal,
} from '@codelab/frontend-application-tag/use-cases/update-tag'
import {
  type ITagsView,
  TagsViewLayout,
} from '@codelab/frontend-application-tag/views'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import Head from 'next/head'
import React from 'react'

const TagsView: ITagsView = () => {
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
