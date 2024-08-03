import { CreateResourceModal } from '@codelab/frontend-application-resource/use-cases/create-resource'
import { DeleteResourceModal } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import {
  UpdateResourceForm,
  UpdateResourceModal,
} from '@codelab/frontend-application-resource/use-cases/update-resource'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Resources | Codelab',
}

const ResourcesRoute = () => {
  return (
    <ContentSection>
      <CreateResourceModal />
      <UpdateResourceModal />
      <DeleteResourceModal />
      <UpdateResourceForm />
    </ContentSection>
  )
}

export default ResourcesRoute
