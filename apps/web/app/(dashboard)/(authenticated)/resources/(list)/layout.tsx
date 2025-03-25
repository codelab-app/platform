import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'

const Layout = async ({ children }: LayoutProps) => {
  const { items: resources } = await resourceRepository.find()

  return (
    <DomainStoreHydrator resourcesDto={resources}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
