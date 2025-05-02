import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Layout = async ({ children }: LayoutProps) => {
  const [{ items: components }, { items: atoms }] = await Promise.all([
    componentListQuery(),
    atomRepository.find(),
  ])

  return (
    <DomainStoreHydrator atomsDto={atoms} componentsDto={components}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
