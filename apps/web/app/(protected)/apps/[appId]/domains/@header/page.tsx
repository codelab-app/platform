import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainsPageHeaderContainer } from './page.container'

const DomainsHeaderPage = async ({
  params: { appId },
}: {
  params: { appId: string }
}) => {
  const { items: appsDto } = await appRepository.find({ id: appId })

  return (
    <DomainStoreHydrator appsDto={appsDto} fallback={<Spinner />}>
      <DomainsPageHeaderContainer appId={appId} />
    </DomainStoreHydrator>
  )
}

export default DomainsHeaderPage
