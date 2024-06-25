import { getAppRepository } from '@codelab/frontend-application-app/services'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = async () => {
  const appRepository = getAppRepository()
  const owner = await getServerUser()

  const { apps } = await appRepository.appsList({
    owner: { id: owner.id },
  })

  return (
    <>
      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      {/* <DeleteAppModal /> */}

      <ContentSection>
        <AppList apps={apps} />
      </ContentSection>
    </>
  )
}

export default AppsView
