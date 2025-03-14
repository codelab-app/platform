import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const authGuardDto = await authGuardRepository.findOne({ id })

  return (
    <DashboardPopover>
      <DomainStoreHydrator
        authGuardsDto={authGuardDto ? [authGuardDto] : []}
        fallback={<Spinner />}
      >
        {children}
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Layout
