import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

import { AppListContainer } from './page.client'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsRoute = async () => {
  const user = await getServerUser()

  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ owner: { id: user.id } }),
    defaultAtomQuery(),
  ])

  const domainsDto = appsDto.flatMap((app) => app.domains)

  return (
    <ContentSection>
      <DomainStoreHydrator
        appsDto={appsDto}
        atomsDto={atomsDto}
        domainsDto={domainsDto}
        fallback={<Spinner />}
        pagesDto={appsDto.flatMap((app) => app.pages)}
      >
        <AppListContainer />
      </DomainStoreHydrator>
    </ContentSection>
  )
}

export default AppsRoute
