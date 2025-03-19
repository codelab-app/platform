import type { ValidatedUrlParamsProps } from '@codelab/frontend/abstract/types'
import type { DashboardSections } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'
import { pipe } from 'remeda'

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
