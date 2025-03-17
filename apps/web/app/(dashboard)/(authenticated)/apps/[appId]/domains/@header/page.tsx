import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DomainsPageHeaderContainer } from '@codelab/frontend-application-domain/views'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const DomainsHeaderPage = async (props: {
  params: Promise<{ appId: string }>
}) => {
  const params = await props.params
  const { appId } = params

  return <DomainsPageHeaderContainer appId={appId} />
}

export default DomainsHeaderPage
