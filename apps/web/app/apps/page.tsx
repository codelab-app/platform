import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useGetAppsPreviewQuery } from '@codelab/frontend-application-app/use-cases/apps-preview'
import { useServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import React from 'react'
import { getQueryClient } from '../components/query.client'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = withPageAuthRequired(async () => {
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
      {/* <BuildAppModal /> */}
      {/* <CreateAppModal /> */}
      {/* <UpdateAppModal />
      <DeleteAppModal /> */}

      {/* <ContentSection>
        <GetAppsList />
      </ContentSection> */}
    </HydrationBoundary>
  )
})

export default AppsView
