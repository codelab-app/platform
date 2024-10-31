import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { ResourcesPrimarySidebar } from '@codelab/frontend-application-resource/views'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'

const Page = async () => {
  const { items: resources } = await resourceRepository.find()

  return (
    <DomainStoreHydrator
      fallback={<ResourcesPrimarySidebar isLoading={true} />}
      resourcesDto={resources}
    >
      <ResourcesPrimarySidebar />
    </DomainStoreHydrator>
  )
}

export default Page
