'use client'
import type {
  IPaginationData,
  IPaginationSearchParams,
} from '@codelab/frontend/abstract/application'
import type { IRef, ITypeDto } from '@codelab/shared/abstract/core'
import type { TypeFragment } from '@codelab/shared/infra/gqlgen'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { isDefined } from 'remeda'

import { useTypeService } from '../services'
import { TypesPrimarySidebar } from './TypesPrimarySidebar'

export const TypesPrimarySidebarContainer = observer<{
  pagination: IPaginationData
  searchParams: IPaginationSearchParams
  typesDto: Array<TypeFragment>
}>(({ pagination, searchParams, typesDto }) => {
  const { typeDomainService } = useDomainStore()
  const types = typeDomainService.hydrateTypes(typesDto)

  return (
    <TypesPrimarySidebar
      pagination={pagination}
      searchParams={searchParams}
      types={types}
    />
  )
})
