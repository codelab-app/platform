'use client'
import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
import { useRedirectPaginationRoute } from '@codelab/frontend-application-shared-store/router'
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
  types: Array<IRef>
  searchParams: IPaginationSearchParams
  pagination: {
    totalItems: number
  }
}>(({ pagination: { totalItems }, searchParams, types }) => {
  const { typeDomainService } = useDomainStore()
  const { paginationService } = useTypeService()
  const { routerService } = useApplicationStore()

  const typeModels = types
    .map((typeRef) => typeDomainService.types.get(typeRef.id))
    .filter(isDefined)

  const redirect = useRedirectPaginationRoute(searchParams, PageType.Type())

  const onPageChange = (page: number, pageSize: number) => {
    redirect((params) => {
      params.page = page
      params.pageSize = pageSize
    })

    routerService.setSearchParams({
      ...routerService.searchParams,
      page,
      pageSize,
    })
  }

  useEffect(() => {
    paginationService.setData(typeModels, totalItems)
    logTimestampMs('set data')
  }, [typeDomainService.typesList])

  return (
    <TypesPrimarySidebar
      onPageChange={onPageChange}
      searchParams={searchParams}
      types={typeModels}
    />
  )
})
