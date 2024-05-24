import { CreateResourceModal } from '@codelab/frontend-application-resource/use-cases/create-resource'
import { DeleteResourceModal } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import {
  UpdateResourceForm,
  UpdateResourceModal,
} from '@codelab/frontend-application-resource/use-cases/update-resource'
import {
  type ResourcesView,
  ResourcesViewLayout,
} from '@codelab/frontend-application-resource/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth/guards'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ResourcesView: ResourcesView = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>

      <ContentSection>
        <CreateResourceModal />
        <UpdateResourceModal />
        <DeleteResourceModal />
        {resource && <UpdateResourceForm />}
      </ContentSection>
    </>
  )
})

export default ResourcesView

export const getServerSideProps = withPageAuthRedirect()

ResourcesView.Layout = ResourcesViewLayout
