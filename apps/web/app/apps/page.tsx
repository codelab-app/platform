import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Apps | Codelab',
}

const AppsPage = () => {
  return (
    <>
      <BuildAppModal />
      {/* <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal /> */}

      <ContentSection>{/* <GetAppsList /> */}</ContentSection>
    </>
  )
}

export default AppsPage
