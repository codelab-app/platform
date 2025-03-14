import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { ResourcesPrimarySidebar } from '@codelab/frontend-application-resource/views'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'

const Page = async () => {
  return <ResourcesPrimarySidebar />
}

export default Page
