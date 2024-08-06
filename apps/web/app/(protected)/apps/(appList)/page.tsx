import { StoreHydrator } from '@codelab/frontend/infra/context'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { appListQuery } from '@codelab/frontend-domain-app/repositories'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsRoute = async () => {
  const [{ items: apps }, { items: atoms }] = await Promise.all([
    appListQuery(),
    defaultAtomQuery(),
  ])

  return (
    <StoreHydrator apps={apps} atoms={atoms}>
      <CreateAppModal />
      <DeleteAppModal />
      <UpdateAppModal />
      <BuildAppModal />
      <ContentSection>
        <AppList />
      </ContentSection>
    </StoreHydrator>
  )
}

export default AppsRoute
