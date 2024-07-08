import {
  AppList,
  appListUseCase,
} from '@codelab/frontend-application-app/use-cases/app-list'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { AppsViewHeader } from '@codelab/frontend-application-app/views'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = async () => {
  const { apps, atoms } = await appListUseCase()

  return (
    <DashboardTemplate Header={<AppsViewHeader />}>
      <CreateAppModal />
      <DeleteAppModal />
      <UpdateAppModal />
      {/* 
        <BuildAppModal /> 
      */}

      <ContentSection>
        <AppList apps={apps} atoms={atoms} />
      </ContentSection>
    </DashboardTemplate>
  )
}

export default AppsView
