'use client'
import type { IPaginationData } from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'
import type { TypeFragment } from '@codelab/shared/infra/gqlgen'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

import { TypesPrimarySidebar } from './TypesPrimarySidebar'

interface TypesPrimarySidebarContainerProps {
  pagination: IPaginationData
  searchParams: TreeViewClientProps & PaginationClientProps
  typesDto: Array<TypeFragment>
}

export const TypesPrimarySidebarContainer = ({
  pagination,
  searchParams,
  typesDto,
}: TypesPrimarySidebarContainerProps) => {
  const { typeDomainService } = useDomainStore()
  const types = typeDomainService.hydrateTypes(typesDto)

  return (
    <TypesPrimarySidebar
      pagination={pagination}
      searchParams={searchParams}
      types={types}
    />
  )
}
