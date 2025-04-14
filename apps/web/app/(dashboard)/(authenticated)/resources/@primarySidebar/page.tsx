import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { resourceListQuery } from '@codelab/frontend-application-resource/use-cases/resource-list'
import { ResourcesPrimarySidebarContainer } from '@codelab/frontend-application-resource/views'

const Page = async () => {
  const { resourcesDto } = await resourceListQuery()

  return (
    <DomainStoreHydrator resourcesDto={resourcesDto}>
      <ResourcesPrimarySidebarContainer />
    </DomainStoreHydrator>
  )
}

export default Page
