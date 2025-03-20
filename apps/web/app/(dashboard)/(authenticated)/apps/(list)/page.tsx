import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { AppListContainer } from '@codelab/frontend-application-app/use-cases/app-list'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { appListQuery } from '@codelab/frontend-application-app/use-cases/app-list'
export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const Page = async () => {
  // We preload in layout, so it's okay to access query in a page
  const { appsDto, atomsDto, domainsDto, pagesDto } = await appListQuery()

  return (
    <DomainStoreHydrator
      appsDto={appsDto}
      atomsDto={atomsDto}
      domainsDto={domainsDto}
      pagesDto={pagesDto}
    >
      <AppListContainer />
    </DomainStoreHydrator>
  )
}

export default Page
