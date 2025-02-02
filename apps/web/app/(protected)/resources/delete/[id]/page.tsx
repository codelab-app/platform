import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DeleteResourceModalConnector } from './page.connector'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const resourceDto = await resourceRepository.findOne({ id })

  return (
    <DomainStoreHydrator
      fallback={<Spinner />}
      resourcesDto={resourceDto ? [resourceDto] : []}
    >
      <DeleteResourceModalConnector id={id} />
    </DomainStoreHydrator>
  )
}

export default Page
