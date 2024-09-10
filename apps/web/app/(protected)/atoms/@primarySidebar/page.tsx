'use client'

import type { UrlQueryParamsString } from '@codelab/frontend/abstract/types'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
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
