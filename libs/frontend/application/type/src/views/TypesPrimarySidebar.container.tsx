'use client'
import type {
  IAtomCreateRoute,
  IPaginationData,
} from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'
import type { TypeFragment } from '@codelab/shared/infra/gqlgen'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

import { TypesPrimarySidebar } from './TypesPrimarySidebar'

interface TypesPrimarySidebarContainerProps {
  context: IAtomCreateRoute
  pagination: IPaginationData
  typesDto: Array<TypeFragment>
}

export const TypesPrimarySidebarContainer = ({
  context,
  pagination,
  typesDto,
}: TypesPrimarySidebarContainerProps) => {
  const { typeDomainService } = useDomainStore()
  const types = typeDomainService.hydrateTypes(typesDto)

  return (
    <TypesPrimarySidebar
      context={context}
      pagination={pagination}
      types={types}
    />
  )
}
