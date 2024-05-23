import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Apps | Codelab',
}

const AppsPage = () => {
  return (
    <>
      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>{/* <GetAppsList /> */}</ContentSection>
    </>
  )
}

export default AppsPage
