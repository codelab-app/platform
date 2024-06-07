import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useGetAppsPreviewQuery } from '@codelab/frontend-application-app/use-cases/apps-preview'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { useServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import React from 'react'
import { getQueryClient } from '../components/query.client'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = auth0Instance.withPageAuthRequired(async () => {
  const queryClient = getQueryClient()
  const user = await useServerUser()

  void queryClient.prefetchQuery({
    queryFn: useGetAppsPreviewQuery.fetcher({
      where: { owner: { id: user.auth0Id } },
    }),
    queryKey: useGetAppsPreviewQuery.getKey(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        <GetAppsList />
      </ContentSection>
    </HydrationBoundary>
  )
})

export default AppsView
