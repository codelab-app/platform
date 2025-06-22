import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Layout = async ({ children, params }: LayoutProps<'typeId'>) => {
  const { typeId } = await params
  const type = await typeRepository.findOne({ id_IN: [typeId] })

  if (!type) {
    return null
  }

  return <DomainStoreHydrator typesDto={[type]}>{children}</DomainStoreHydrator>
}

export default Layout
