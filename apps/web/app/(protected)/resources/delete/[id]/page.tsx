import type { Metadata } from 'next'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { DeleteResourceModalConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Delete Resource | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params
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
