import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { AuthGuardsPrimarySidebar } from '@codelab/frontend-application-auth-guard/views'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'

const Page = async () => {
  const { items: authGuardsDto } = await authGuardRepository.find()

  return (
    <DomainStoreHydrator authGuardsDto={authGuardsDto}>
      <AuthGuardsPrimarySidebar />
    </DomainStoreHydrator>
  )
}

export default Page
