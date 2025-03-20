import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { tagRepository } from '@codelab/frontend-domain-tag/repositories'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'

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
