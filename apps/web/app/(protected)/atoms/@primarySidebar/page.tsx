'use client'

import type { UrlQueryParamsString } from '@codelab/frontend/abstract/types'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import React from 'react'

const Page = ({
  searchParams: { filter, page, pageSize, primarySidebarKey, search },
}: {
  searchParams: UrlQueryParamsString
}) => {
  return (
    <ApplicationStoreHydrator
      fallback={<Spinner />}
      queryParams={{ filter, page, pageSize, primarySidebarKey, search }}
    >
      <AtomsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default Page
