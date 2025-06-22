import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Layout = async ({ children, params }: LayoutProps<'authGuardId'>) => {
  const { authGuardId } = await params
  const authGuardDto = await authGuardRepository.findOne({ id: authGuardId })

  return (
    <DomainStoreHydrator authGuardsDto={authGuardDto ? [authGuardDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
