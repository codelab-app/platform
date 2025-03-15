import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Components | Codelab',
}

const Page = () => {
  return null
}

export default Page
