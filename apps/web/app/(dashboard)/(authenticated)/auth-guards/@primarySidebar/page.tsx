import { AuthGuardsPrimarySidebar } from '@codelab/frontend-application-auth-guard/views'
import { resourceListQuery } from '@codelab/frontend-application-resource/use-cases/resource-list'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async () => {
  const [{ resourcesDto }, { items: authGuards }] = await Promise.all([
    resourceListQuery(),
    authGuardRepository.find(),
  ])

  return (
    <DomainStoreHydrator authGuardsDto={authGuards} resourcesDto={resourcesDto}>
      <AuthGuardsPrimarySidebar />
    </DomainStoreHydrator>
  )
}

export default Page
