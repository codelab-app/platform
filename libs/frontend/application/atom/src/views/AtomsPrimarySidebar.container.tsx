'use client'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import { PageType } from '@codelab/frontend/abstract/application'
import { useRedirectPaginationRoute } from '@codelab/frontend-application-shared-store/router'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { isDefined } from 'remeda'

import { useAtomService } from '../services'
import { AtomsPrimarySidebar } from './AtomsPrimarySidebar'

export const AtomsPrimarySidebarContainer = observer<{
  pagination: {
    totalItems: number
  }
  searchParams: SearchParamsPageProps
  atomsRef: Array<IRef>
}>(({ atomsRef, pagination: { totalItems }, searchParams }) => {
  const { atomDomainService } = useDomainStore()
  const { paginationService } = useAtomService()
  const { routerService } = useApplicationStore()

  const atoms = atomsRef
    .map((atomRef) => atomDomainService.atoms.get(atomRef.id))
    .filter(isDefined)

  const redirect = useRedirectPaginationRoute(searchParams, PageType.Atoms())

  const onPageChange = (page: number, pageSize: number) => {
    redirect((params) => {
      params.set('page', page.toString())
      params.set('pageSize', pageSize.toString())
    })

    routerService.setSearchParams({
      ...routerService.searchParams,
      page,
      pageSize,
    })
  }

  useEffect(() => {
    paginationService.setData(atoms, totalItems)
  }, [atomDomainService.atomsList])

  return <AtomsPrimarySidebar atoms={atoms} onPageChange={onPageChange} />
})
