import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainDeleteConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Delete Domain | Codelab',
}

const Page = async (props: { params: Promise<{ domainId: string }> }) => {
  const params = await props.params
  const { domainId } = params
  const domainDto = await domainRepository.findOne({ id: domainId })

  return (
    <DomainStoreHydrator
      domainsDto={domainDto ? [domainDto] : []}
      fallback={<Spinner />}
    >
      <DomainDeleteConnector id={domainId} />
    </DomainStoreHydrator>
  )
}

export default Page
