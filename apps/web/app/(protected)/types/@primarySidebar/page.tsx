import type { UrlQueryParamsPageProps } from '@codelab/frontend/abstract/types'

import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { TypesPrimarySidebar } from '@codelab/frontend-application-type/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const TypesPrimarySidebarPage = async ({
  searchParams,
}: {
  searchParams: UrlQueryParamsPageProps
}) => {
  return (
    <ApplicationStoreHydrator fallback={<Spinner />} queryParams={searchParams}>
      <TypesPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default TypesPrimarySidebarPage
