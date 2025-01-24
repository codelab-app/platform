import type { URLSeachParamPageProps } from '@codelab/frontend/abstract/types'

import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Page = async ({
  searchParams,
}: {
  searchParams: URLSeachParamPageProps
}) => {
  // const { items } = await atomRepository.find({})

  return (
    <ApplicationStoreHydrator fallback={<Spinner />} queryParams={searchParams}>
      <AtomsPrimarySidebar />
    </ApplicationStoreHydrator>
  )
}

export default Page
