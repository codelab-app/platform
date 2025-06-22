import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import {
  AppListContainer,
  appListQuery,
} from '@codelab/frontend-application-app/use-cases/app-list'

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
