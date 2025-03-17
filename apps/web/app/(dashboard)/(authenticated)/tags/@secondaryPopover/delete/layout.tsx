import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ ids: Array<string> }>
}) => {
  const { ids } = await params
  // const ids = decodeURIComponent(id).split(',')
  const { items: tagsDto } = await tagRepository.find({ id_IN: ids })

  return (
    <DomainStoreHydrator fallback={<Spinner />} tagsDto={tagsDto}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
