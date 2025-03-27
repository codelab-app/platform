import type { DashboardLayoutProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

const Layout = async ({
  children,
  header,
  primarySidebar,
  secondaryPopover,
}: DashboardLayoutProps<'header' | 'primarySidebar' | 'secondaryPopover'>) => {
  const { items: resources } = await resourceRepository.find()

  return (
    <DomainStoreHydrator resourcesDto={resources}>
      <DashboardLayout<'header' | 'primarySidebar' | 'secondaryPopover'>
        header={header}
        primarySidebar={primarySidebar}
        secondaryPopover={secondaryPopover}
      >
        {children}
      </DashboardLayout>
    </DomainStoreHydrator>
  )
}

export default Layout
