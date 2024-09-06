'use client'

import type { UrlQueryParamsString } from '@codelab/frontend/abstract/types'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { useUrlQueryParams } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React, { useEffect } from 'react'

const Demo = () => {
  const { routerService } = useApplicationStore()

  useEffect(() => {
    console.log('Demo', routerService.page)
  }, [])

  return null
}

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
      {/* <Demo /> */}
      <AtomsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default Page
