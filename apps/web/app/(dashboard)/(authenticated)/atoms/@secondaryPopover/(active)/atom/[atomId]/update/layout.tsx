import type { LayoutProps } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'

const Layout = async ({ children, params }: LayoutProps<'atomId'>) => {
  const { atomId } = await params
  const atomDto = await atomRepository.findOne({ id: atomId })
  const atomsDto = atomDto ? [atomDto] : []
  const tagsDto = atomDto?.tags ?? []

  return (
    <DomainStoreHydrator atomsDto={atomsDto} tagsDto={tagsDto}>
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
