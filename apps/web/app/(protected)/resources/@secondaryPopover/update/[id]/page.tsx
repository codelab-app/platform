import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

import UpdateResourceConnector from './page.connector'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const resourceDto = await resourceRepository.findOne({ id })

  return (
    <DashboardPopover>
      <DomainStoreHydrator
        fallback={<Spinner />}
        resourcesDto={resourceDto ? [resourceDto] : []}
      >
        <UpdateResourceConnector id={id} />
      </DomainStoreHydrator>
    </DashboardPopover>
  )
}

export default Page
