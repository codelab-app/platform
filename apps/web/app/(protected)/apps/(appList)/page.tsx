import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

import { AppListContainer } from './page.container'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

// export const dynamic = 'force-dynamic'

const AppsRoute = async () => {
  const user = await getServerUser()

  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.find({ owner: user }),
    defaultAtomQuery(),
  ])

  return (
    <>
      <CreateAppModal />
      <DeleteAppModal />
      <UpdateAppModal />
      <BuildAppModal />
      <ContentSection>
        <DomainStoreHydrator
          appsDto={appsDto}
          atomsDto={atomsDto}
          fallback={<Spinner />}
        >
          <AppListContainer />
        </DomainStoreHydrator>
      </ContentSection>
    </>
  )
}

export default AppsRoute
