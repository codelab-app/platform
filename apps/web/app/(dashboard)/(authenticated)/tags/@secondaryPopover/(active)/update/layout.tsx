import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { DomainStoreHydrator } from '@codelab/frontend-infra-context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'

const Layout = async ({ children, params }: LayoutProps<'tagId'>) => {
  const { tagId } = await params
  const tagDto = await tagRepository.findOne({ id: tagId })

  return (
    <DomainStoreHydrator tagsDto={tagDto ? [tagDto] : []}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
