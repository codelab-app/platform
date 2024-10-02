import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { atomListQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export const metadata: Metadata = {
  title: 'Components | Codelab',
}

const Page = async () => {
  const [{ items: components }, { items: atoms }] = await Promise.all([
    componentListQuery(),
    atomListQuery(),
  ])

  return (
    <DomainStoreHydrator
      atomsDto={atoms}
      componentsDto={components}
      fallback={<Spinner />}
    >
      <></>
    </DomainStoreHydrator>
  )
}

export default Page
