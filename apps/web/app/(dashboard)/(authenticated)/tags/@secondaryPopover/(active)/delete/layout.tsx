import type { LayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'

const Layout = async ({ children, params }: LayoutProps<'tagIds'>) => {
  const { tagIds } = await params
  const { items: tagsDto } = await tagRepository.find({ id_IN: tagIds })

  return <DomainStoreHydrator tagsDto={tagsDto}>{children}</DomainStoreHydrator>
}

export default Layout
