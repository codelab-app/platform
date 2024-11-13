import type { UrlQueryParamsPageProps } from '@codelab/frontend/abstract/types'

import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Page = ({ searchParams }: { searchParams: UrlQueryParamsPageProps }) => {
  return (
    <ApplicationStoreHydrator fallback={<Spinner />} queryParams={searchParams}>
      <AtomsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default Page
