'use client'
import type {
  IPaginationData,
  IPaginationSearchParams,
} from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { isDefined } from 'remeda'

import { useAtomService } from '../services'
import { AtomsPrimarySidebar } from './AtomsPrimarySidebar'

export const AtomsPrimarySidebarContainer = observer<{
  pagination: IPaginationData
  searchParams: IPaginationSearchParams
  atomsRef: Array<IRef>
}>(({ atomsRef, pagination, searchParams }) => {
  const { atomDomainService } = useDomainStore()

  const atoms = atomsRef
    .map((atomRef) => atomDomainService.atoms.get(atomRef.id))
    .filter(isDefined)

  return (
    <AtomsPrimarySidebar
      atoms={atoms}
      pagination={pagination}
      searchParams={searchParams}
    />
  )
})
