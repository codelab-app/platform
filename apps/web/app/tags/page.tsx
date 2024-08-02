import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { CreateTagModal } from '@codelab/frontend-application-tag/use-cases/create-tag'
import { DeleteTagsModal } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import {
  UpdateTagForm,
  UpdateTagModal,
} from '@codelab/frontend-application-tag/use-cases/update-tag'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Tags | Codelab',
}

const TagsRoute = () => {
  return (
    <>
      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagsModal />

      <ContentSection>
        <UpdateTagForm />
      </ContentSection>
    </>
  )
}

export default TagsRoute
