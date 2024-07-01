import {
  AppList,
  appListUseCase,
} from '@codelab/frontend-application-app/use-cases/app-list'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = async () => {
  const { apps, atoms } = await appListUseCase()

  return (
    <>
      <CreateAppModal />
      <DeleteAppModal />
      <UpdateAppModal />
      {/* 
        <BuildAppModal /> 
      */}

      <ContentSection>
        <AppList apps={apps} atoms={atoms} />
      </ContentSection>
    </>
  )
}

export default AppsView
