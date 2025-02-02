import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DomainsPageHeaderConnector } from './page.connector'

const DomainsHeaderPage = async (
  props: {
    params: Promise<{ appId: string }>
  }
) => {
  const params = await props.params;

  const {
    appId
  } = params;

  const { items: appsDto } = await appRepository.find({ id: appId })

  return (
    <DomainStoreHydrator appsDto={appsDto} fallback={<Spinner />}>
      <DomainsPageHeaderConnector appId={appId} />
    </DomainStoreHydrator>
  )
}

export default DomainsHeaderPage
