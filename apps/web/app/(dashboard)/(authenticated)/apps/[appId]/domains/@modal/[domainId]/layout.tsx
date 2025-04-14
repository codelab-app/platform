import type { LayoutProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'

const Layout = async ({ children, params }: LayoutProps<'domainId'>) => {
  const { domainId } = await params
  const domainDto = await domainRepository.findOne({ id: domainId })

  return (
    <DomainStoreHydrator domainsDto={domainDto ? [domainDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
