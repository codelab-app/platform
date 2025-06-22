import { AuthGuardsPrimarySidebar } from '@codelab/frontend-application-auth-guard/views'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { DomainStoreHydrator } from '@codelab/frontend-infra-context'

const Page = async () => {
  const { items: authGuardsDto } = await authGuardRepository.find()

  return (
    <DomainStoreHydrator authGuardsDto={authGuardsDto}>
      <AuthGuardsPrimarySidebar />
    </DomainStoreHydrator>
  )
}

export default Page
