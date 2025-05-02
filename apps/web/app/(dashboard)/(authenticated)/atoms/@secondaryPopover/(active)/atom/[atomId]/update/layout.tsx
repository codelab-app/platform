import type { LayoutProps } from '@codelab/frontend-abstract-types'

import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

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
