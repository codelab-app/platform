import { getQueryOptions } from '@codelab/frontend/infra/graphql'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { useServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import request from 'graphql-request'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = auth0ServerInstance.withPageAuthRequired(async () => {
  return (
    <>
      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        <AppList />
      </ContentSection>
    </>
  )
})

export default AppsView
