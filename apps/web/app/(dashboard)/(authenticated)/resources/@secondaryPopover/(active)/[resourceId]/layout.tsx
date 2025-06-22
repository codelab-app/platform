import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'

const Layout = async ({ children, params }: LayoutProps<'resourceId'>) => {
  const { resourceId } = await params
  const resourceDto = await resourceRepository.findOne({ id: resourceId })

  return (
    <DomainStoreHydrator resourcesDto={resourceDto ? [resourceDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
