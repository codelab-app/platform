'use client'
import type {
  IPaginationData,
  IPaginationSearchParams,
} from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
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
  types: Array<IRef>
}>(({ pagination, searchParams, types }) => {
  const { typeDomainService } = useDomainStore()

  const typeModels = types
    .map((typeRef) => typeDomainService.types.get(typeRef.id))
    .filter(isDefined)

  return (
    <TypesPrimarySidebar
      pagination={pagination}
      searchParams={searchParams}
      types={typeModels}
    />
  )
})
