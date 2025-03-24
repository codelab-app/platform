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
  const { atomDomainService } = useDomainStore()
  const { paginationService } = useAtomService()

  const atoms = atomsRef
    .map((atomRef) => atomDomainService.atoms.get(atomRef.id))
    .filter(isDefined)

  useEffect(() => {
    paginationService.setData(atoms, totalItems)
    logTimestampMs('set data')
    // Include searchParams to ensure pagination updates when navigating between
    // already loaded pages (e.g., page 2->3->2) where atoms and totalItems remain the same
  }, [searchParams])

  return <AtomsPrimarySidebar atoms={atoms} searchParams={searchParams} />
})
