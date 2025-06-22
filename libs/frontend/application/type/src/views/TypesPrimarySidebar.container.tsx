'use client'
import type {
  IPaginationData,
  ITypeCreateRoute,
} from '@codelab/frontend-abstract-application'
import type { TypeFragment } from '@codelab/shared-infra-gqlgen'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { observer } from 'mobx-react-lite'
import { isDefined } from 'remeda'

import { TypesPrimarySidebar } from './TypesPrimarySidebar'

export const TypesPrimarySidebarContainer = observer<{
  context: ITypeCreateRoute
  pagination: IPaginationData
  typesDto: Array<TypeFragment>
}>(({ context, pagination, typesDto }) => {
  const { typeDomainService } = useDomainStore()

  const types = typesDto
    .map((typeDto) => typeDomainService.types.get(typeDto.id))
    .filter(isDefined)

  return (
    <TypesPrimarySidebar
      context={context}
      pagination={pagination}
      types={types}
    />
  )
})
