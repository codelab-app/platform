import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = async () => {
  return (
    <>
      <CreateAppModal />
      {/* <BuildAppModal /> 
      <UpdateAppModal />
       <DeleteAppModal /> */}

      <ContentSection>
        <AppList />
      </ContentSection>
    </>
  )
}

export default AppsView
