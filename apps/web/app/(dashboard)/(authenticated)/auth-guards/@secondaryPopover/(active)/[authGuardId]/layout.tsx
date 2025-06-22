import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'

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
