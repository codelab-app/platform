'use client'
import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
import { useRedirectPaginationRoute } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { isDefined } from 'remeda'

import { useAtomService } from '../services'
import { AtomsPrimarySidebar } from './AtomsPrimarySidebar'

export const AtomsPrimarySidebarContainer = observer<{
  pagination: {
    totalItems: number
  }
  searchParams: IPaginationSearchParams
  atomsRef: Array<IRef>
}>(({ atomsRef, pagination: { totalItems }, searchParams }) => {
  logTimestampMs('AtomsPrimarySidebarContainer')

  const { atomDomainService } = useDomainStore()
  const { paginationService } = useAtomService()

  const atoms = atomsRef
    .map((atomRef) => atomDomainService.atoms.get(atomRef.id))
    .filter(isDefined)

  const redirect = useRedirectPaginationRoute(searchParams, PageType.Atoms())

  const onPageChange = (page: number, pageSize: number) => {
    redirect((params) => {
      params.page = page
      params.pageSize = pageSize
    })
  }

  useEffect(() => {
    paginationService.setData(atoms, totalItems)
    logTimestampMs('set data')
  }, [atomDomainService.atomsList])

  return (
    <AtomsPrimarySidebar
      atoms={atoms}
      onPageChange={onPageChange}
      searchParams={searchParams}
    />
  )
})
