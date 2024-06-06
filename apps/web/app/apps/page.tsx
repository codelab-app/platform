import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { useGetAppsPreviewQuery } from '@codelab/frontend-application-app/use-cases/apps-preview'
import {
  AppsViewLayout,
  type IAppsView,
} from '@codelab/frontend-application-app/views'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { IRef } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import type { Metadata } from 'next'
import Head from 'next/head'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getQueryClient } from '../components/query.client'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = () => {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: useGetAppsPreviewQuery.getKey(),
    queryFn: () => useGetAppsPreviewQuery.fetcher,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <BuildAppModal /> */}
      <CreateAppModal />
      {/* <UpdateAppModal />
      <DeleteAppModal /> */}

      <ContentSection>
        <GetAppsList />
      </ContentSection>
    </HydrationBoundary>
  )
}

export default AppsView
