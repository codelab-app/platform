import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { ApplicationStoreHydrator } from '@codelab/frontend/infra/context'
import { AtomsPrimarySidebar } from '@codelab/frontend-application-atom/views'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Page = async () => {
  // const { items } = await atomRepository.find({})

  return <AtomsPrimarySidebar />
}

export default Page
