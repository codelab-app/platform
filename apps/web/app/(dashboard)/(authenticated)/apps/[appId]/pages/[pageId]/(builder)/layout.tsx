import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ appId: string }>
}) => {
  const { appId } = await params

  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ id: appId }),
    defaultAtomQuery(),
  ])

  const domainsDto = appsDto.flatMap((app) => app.domains)

  return (
    <DomainStoreHydrator
      appsDto={appsDto}
      atomsDto={atomsDto}
      domainsDto={domainsDto}
      fallback={<Spinner />}
      pagesDto={appsDto.flatMap((app) => app.pages)}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
