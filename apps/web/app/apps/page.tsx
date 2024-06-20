import { getQueryOptions } from '@codelab/frontend/infra/graphql'
import {
  AppList,
  AppList_query,
} from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { useServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import { dehydrate, HydrationBoundary, useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import type { Metadata } from 'next'
import React from 'react'
import { getQueryClient } from '../components/query.client'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = auth0ServerInstance.withPageAuthRequired(async () => {
  const queryClient = getQueryClient()
  const user = await useServerUser()

  // const { data } = useQuery({
  //   queryFn: () => request(getEnv().endpoint.apiGraphqlUrl, AppList_Query, {}),
  //   queryKey: ['AppList_Query'],
  // })

  void queryClient.prefetchQuery({
    ...getQueryOptions(AppList_query, {
      where: { owner: { id: user.auth0Id } },
    }),
    // queryFn: useGetAppsPreviewQuery.fetcher({
    //   where: { owner: { id: user.auth0Id } },
    // }),
    // queryKey: useGetAppsPreviewQuery.getKey(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        <AppList />
      </ContentSection>
    </HydrationBoundary>
  )
})

export default AppsView
