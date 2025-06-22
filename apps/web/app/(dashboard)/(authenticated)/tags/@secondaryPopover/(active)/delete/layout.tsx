import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Layout = async ({ children, params }: LayoutProps<'tagIds'>) => {
  const { tagIds } = await params
  const { items: tagsDto } = await tagRepository.find({ id_IN: tagIds })

  return <DomainStoreHydrator tagsDto={tagsDto}>{children}</DomainStoreHydrator>
}

export default Layout
