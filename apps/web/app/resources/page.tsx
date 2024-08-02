import { ClientContainer } from '@codelab/frontend/presentation/container'
import { CreateResourceModal } from '@codelab/frontend-application-resource/use-cases/create-resource'
import { DeleteResourceModal } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import {
  UpdateResourceForm,
  UpdateResourceModal,
  useUpdateResourceForm,
} from '@codelab/frontend-application-resource/use-cases/update-resource'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import type { Metadata } from 'next'
import Head from 'next/head'
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
