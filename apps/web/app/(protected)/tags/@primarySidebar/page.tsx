import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { TagsPrimarySidebar } from '@codelab/frontend-application-tag/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const TagsPrimarySidebarPage = ({
  searchParams,
}: {
  searchParams: SearchParamsPageProps
}) => {
  return (
    <ApplicationStoreHydrator
      fallback={<Spinner />}
      searchParams={searchParams}
    >
      <TagsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default TagsPrimarySidebarPage
