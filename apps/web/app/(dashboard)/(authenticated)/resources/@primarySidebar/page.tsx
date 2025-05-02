import { resourceListQuery } from '@codelab/frontend-application-resource/use-cases/resource-list'
import { ResourcesPrimarySidebarContainer } from '@codelab/frontend-application-resource/views'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async () => {
  const { resourcesDto } = await resourceListQuery()

  return (
    <DomainStoreHydrator resourcesDto={resourcesDto}>
      <ResourcesPrimarySidebarContainer />
    </DomainStoreHydrator>
  )
}

export default Page
