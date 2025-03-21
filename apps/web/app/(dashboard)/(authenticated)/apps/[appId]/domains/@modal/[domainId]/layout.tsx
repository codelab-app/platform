import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ domainId: string }>
}) => {
  const { domainId } = await params
  const domainDto = await domainRepository.findOne({ id: domainId })

  return (
    <DomainStoreHydrator
      domainsDto={domainDto ? [domainDto] : []}
      fallback={<Spinner />}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
