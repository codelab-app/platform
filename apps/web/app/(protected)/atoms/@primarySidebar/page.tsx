'use client'

import type { SearchParamsString } from '@codelab/frontend/abstract/types'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import {
  usePaginationQuery,
  useSearchQuery,
} from '@codelab/frontend-application-shared-store/pagination'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = ({
  searchParams: { filter, page, pageSize, primarySidebarKey, search },
}: {
  searchParams: SearchParamsString
}) => {
  console.log({ page, pageSize })

  // const { filter, search } = useSearchQuery<NameFilter>(searchParams)
  // const { page, pageSize } = usePaginationQuery(searchParams)

  return (
    <ApplicationStoreHydrator
      fallback={<Spinner />}
      searchParams={{ filter, page, pageSize, primarySidebarKey, search }}
    >
      <AtomsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default Page
