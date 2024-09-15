'use client'

import type { UrlQueryParamsString } from '@codelab/frontend/abstract/types'
import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { TagsPrimarySidebar } from '@codelab/frontend-application-tag/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const TagsPrimarySidebarPage = ({
  searchParams: { filter, page, pageSize, search },
}: {
  searchParams: UrlQueryParamsString
}) => {
  return (
    <ApplicationStoreHydrator
      fallback={<Spinner />}
      queryParams={{ filter, page, pageSize, search }}
    >
      <TagsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default TagsPrimarySidebarPage
