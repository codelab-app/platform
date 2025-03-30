'use client'
import type {
  IAtomCreateRoute,
  IAtomUpdateRoute,
  IPaginationData,
} from '@codelab/frontend/abstract/application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { isDefined } from 'remeda'

import { AtomsPrimarySidebar } from './AtomsPrimarySidebar'

export const AtomsPrimarySidebarContainer = observer<{
  pagination: IPaginationData
  searchParams: TreeViewClientProps & PaginationClientProps
  atomsRef: Array<IRef>
  context: IAtomCreateRoute
}>(({ atomsRef, context, pagination, searchParams }) => {
  const { atomDomainService } = useDomainStore()

  const atoms = atomsRef
    .map((atomRef) => atomDomainService.atoms.get(atomRef.id))
    .filter(isDefined)

  return (
    <AtomsPrimarySidebar
      atoms={atoms}
      context={context}
      pagination={pagination}
      searchParams={searchParams}
    />
  )
})
