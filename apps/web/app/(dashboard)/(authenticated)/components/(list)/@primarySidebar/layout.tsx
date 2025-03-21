import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({ children }: { children: ReactNode }) => {
  const [{ items: components }, { items: atoms }] = await Promise.all([
    componentListQuery(),
    atomRepository.find(),
  ])

  return (
    <DomainStoreHydrator
      atomsDto={atoms}
      componentsDto={components}
      fallback={<Spinner />}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
