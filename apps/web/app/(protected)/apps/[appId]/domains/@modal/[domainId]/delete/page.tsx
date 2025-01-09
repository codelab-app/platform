import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainDeleteConnector } from './page.connector'

const Page = async ({
  params: { domainId },
}: {
  params: { domainId: string }
}) => {
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
